import { describe, expect, it } from "vitest";
import { readFacebookImportConfig } from "./config";
import { buildFacebookDraft, facebookMessageToPortableText } from "./transform";

describe("Facebook import safety configuration", () => {
  it("is disabled by default and requires no secrets", () => {
    expect(readFacebookImportConfig({})).toEqual({ enabled: false });
  });

  it("refuses to start when an enabled import is missing secrets", () => {
    expect(() => readFacebookImportConfig({ FACEBOOK_IMPORT_ENABLED: "true" })).toThrow(
      "FACEBOOK_IMPORT_START_AT"
    );
  });
});

describe("Facebook text conversion", () => {
  it("preserves emoji, lines and intentional empty lines", () => {
    const result = facebookMessageToPortableText(
      "🚀 Ruszamy!\n\n👉 Sprawdź szczegóły\n✅ Dołącz do nas"
    );

    expect(result.map((item) => item._type)).toEqual(["block", "spacer", "block", "block"]);
    expect(result[0]).toMatchObject({
      _type: "block",
      children: [{ text: "🚀 Ruszamy!" }],
    });
    expect(result[2]).toMatchObject({
      _type: "block",
      children: [{ text: "👉 Sprawdź szczegóły" }],
    });
    expect(result[3]).toMatchObject({
      _type: "block",
      children: [{ text: "✅ Dołącz do nas" }],
    });
  });

  it("turns full web addresses into safe clickable links", () => {
    const result = facebookMessageToPortableText("Więcej: https://akwedukt.org.pl/test.");
    const block = result[0];

    expect(block).toMatchObject({
      _type: "block",
      markDefs: [
        {
          _type: "link",
          href: "https://akwedukt.org.pl/test",
          blank: true,
          rel: "noopener noreferrer",
        },
      ],
    });
  });
});

describe("Facebook draft mapping", () => {
  it("always creates a deterministic unpublished Polish draft", () => {
    const input = {
      id: "123456789_987654321",
      message: "🎉 Łączymy młodzież!\n\nDrugi akapit 🚀",
      createdTime: "2026-10-25T14:00:00+02:00",
    };

    const first = buildFacebookDraft(input);
    const second = buildFacebookDraft(input);

    expect(first).toEqual(second);
    expect(first._id).toBe("drafts.facebook-123456789_987654321");
    expect(first._type).toBe("post");
    expect(first.locale).toBe("pl");
    expect(first.status).toBe("draft");
    expect(first.slug.current).toMatch(/^laczymy-mlodziez-fb-/);
    expect(first.date).toBe("2026-10-25T12:00:00.000Z");
    expect(first.categories).toEqual([]);
    expect(first.tags).toEqual([]);
  });
});
