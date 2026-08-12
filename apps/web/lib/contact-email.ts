import "server-only";

import { Resend } from "resend";

import { createContactEmailContent, type ContactEmailData } from "@/lib/contact-email-content";

const DEFAULT_FROM_EMAIL = "Akwedukt <formularz@akwedukt.org.pl>";
const DEFAULT_TO_EMAIL = "dev.akwedukt@cyfrowe.org";

type ContactEmailResult =
  | { ok: true; id: string }
  | { ok: false; reason: "configuration" | "rate-limited" | "service" };

export async function sendContactEmail(data: ContactEmailData): Promise<ContactEmailResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!apiKey) {
    return { ok: false, reason: "configuration" };
  }

  const from = process.env.RESEND_FROM_EMAIL?.trim() || DEFAULT_FROM_EMAIL;
  const to = process.env.CONTACT_FORM_TO_EMAIL?.trim() || DEFAULT_TO_EMAIL;
  const content = createContactEmailContent(data);

  try {
    const resend = new Resend(apiKey);
    const { data: response, error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: content.subject,
      html: content.html,
      text: content.text,
      tags: [
        { name: "source", value: "contact-form" },
        { name: "language", value: data.language },
        { name: "topic", value: data.subject },
      ],
    });

    if (error) {
      return {
        ok: false,
        reason: error.statusCode === 429 ? "rate-limited" : "service",
      };
    }

    if (!response?.id) {
      return { ok: false, reason: "service" };
    }

    return { ok: true, id: response.id };
  } catch {
    return { ok: false, reason: "service" };
  }
}
