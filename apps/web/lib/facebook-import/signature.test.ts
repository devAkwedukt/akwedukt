import { describe, expect, it } from "vitest";
import { createFacebookSignature, secureTextEquals, verifyFacebookSignature } from "./signature";

describe("Facebook webhook signature verification", () => {
  const appSecret = "test-app-secret";
  const rawBody = JSON.stringify({
    object: "page",
    message: "🚀 Zażółć gęślą jaźń! ✅",
  });

  it("accepts the exact UTF-8 payload signed with the app secret", () => {
    const signatureHeader = createFacebookSignature(rawBody, appSecret);

    expect(verifyFacebookSignature({ rawBody, signatureHeader, appSecret })).toBe(true);
  });

  it("rejects modified text, an incorrect secret and malformed headers", () => {
    const signatureHeader = createFacebookSignature(rawBody, appSecret);

    expect(
      verifyFacebookSignature({
        rawBody: `${rawBody} `,
        signatureHeader,
        appSecret,
      })
    ).toBe(false);
    expect(
      verifyFacebookSignature({
        rawBody,
        signatureHeader,
        appSecret: "wrong-secret",
      })
    ).toBe(false);
    expect(
      verifyFacebookSignature({
        rawBody,
        signatureHeader: "sha256=not-a-valid-digest",
        appSecret,
      })
    ).toBe(false);
    expect(
      verifyFacebookSignature({
        rawBody,
        signatureHeader: null,
        appSecret,
      })
    ).toBe(false);
  });

  it("compares verification tokens without leaking partial matches", () => {
    expect(secureTextEquals("same-token", "same-token")).toBe(true);
    expect(secureTextEquals("same-token", "wrong-token")).toBe(false);
    expect(secureTextEquals("short", "much-longer-token")).toBe(false);
  });
});
