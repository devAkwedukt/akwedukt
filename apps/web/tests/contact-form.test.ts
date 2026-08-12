import { describe, expect, it } from "vitest";

import { createContactEmailContent } from "../lib/contact-email-content";
import { contactFormRequestSchema } from "../lib/contact-form";

const validRequest = {
  name: "Jan Kowalski",
  email: "jan@example.com",
  subject: "volunteering",
  message: "Dzień dobry, chciałbym dowiedzieć się więcej.",
  acceptedTerms: true,
  language: "pl",
  sourcePath: "/wspolpraca/wolontariat",
  website: "",
} as const;

describe("contactFormRequestSchema", () => {
  it("accepts and trims a valid contact request", () => {
    const result = contactFormRequestSchema.safeParse({
      ...validRequest,
      name: "  Jan Kowalski  ",
      email: "  jan@example.com  ",
      message: "  Dzień dobry, chciałbym dowiedzieć się więcej.  ",
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.name).toBe("Jan Kowalski");
      expect(result.data.email).toBe("jan@example.com");
      expect(result.data.message).toBe("Dzień dobry, chciałbym dowiedzieć się więcej.");
    }
  });

  it("rejects untrusted fields and invalid paths", () => {
    expect(
      contactFormRequestSchema.safeParse({
        ...validRequest,
        sourcePath: "/kontakt?redirect=https://example.com",
      }).success
    ).toBe(false);

    expect(
      contactFormRequestSchema.safeParse({
        ...validRequest,
        recipient: "attacker@example.com",
      }).success
    ).toBe(false);
  });

  it("rejects invalid consent, subjects and oversized messages", () => {
    expect(
      contactFormRequestSchema.safeParse({ ...validRequest, acceptedTerms: false }).success
    ).toBe(false);
    expect(contactFormRequestSchema.safeParse({ ...validRequest, subject: "custom" }).success).toBe(
      false
    );
    expect(
      contactFormRequestSchema.safeParse({ ...validRequest, message: "a".repeat(5001) }).success
    ).toBe(false);
  });
});

describe("createContactEmailContent", () => {
  it("creates text and HTML variants without trusting message markup", () => {
    const content = createContactEmailContent(
      {
        name: "Jan & Joanna",
        email: "jan@example.com",
        subject: "event",
        message: "Pierwsza linia\n<script>alert('xss')</script>",
        language: "pl",
        sourcePath: "/wspolpraca",
      },
      new Date("2026-08-11T12:00:00.000Z")
    );

    expect(content.subject).toBe("[Akwedukt] Nowa wiadomość — Wspólne działanie lub warsztaty");
    expect(content.text).toContain("<script>alert('xss')</script>");
    expect(content.html).toContain("Jan &amp; Joanna");
    expect(content.html).toContain("&lt;script&gt;alert(&#39;xss&#39;)&lt;/script&gt;");
    expect(content.html).not.toContain("<script>alert");
    expect(content.html).toContain("2026-08-11T12:00:00.000Z");
  });
});
