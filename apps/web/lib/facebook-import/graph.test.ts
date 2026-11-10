import { describe, expect, it, vi } from "vitest";
import { extractFacebookImageUrls, fetchFacebookPost } from "./graph";

describe("Facebook Graph post reader", () => {
  it("extracts nested image attachments in order and removes exact duplicates", () => {
    const result = extractFacebookImageUrls({
      full_picture: "https://scontent.example/full.jpg",
      attachments: {
        data: [
          {
            media: { image: { src: "https://scontent.xx.fbcdn.net/first.jpg" } },
            subattachments: {
              data: [
                { media: { image: { src: "https://scontent.xx.fbcdn.net/second.jpg" } } },
                { media: { image: { src: "https://scontent.xx.fbcdn.net/first.jpg" } } },
              ],
            },
          },
        ],
      },
    });

    expect(result).toEqual([
      "https://scontent.xx.fbcdn.net/first.jpg",
      "https://scontent.xx.fbcdn.net/second.jpg",
    ]);
  });

  it("uses full_picture only when expanded attachments contain no image", () => {
    expect(
      extractFacebookImageUrls({
        full_picture: "https://scontent.xx.fbcdn.net/fallback.jpg",
        attachments: { data: [{ media_type: "link" }] },
      })
    ).toEqual(["https://scontent.xx.fbcdn.net/fallback.jpg"]);
  });

  it("uses a bearer token without putting it in the URL", async () => {
    const fetcher = vi.fn(
      async (_input: RequestInfo | URL, _init?: RequestInit) =>
        new Response(
          JSON.stringify({
            id: "page-123_456",
            message: "Treść",
            created_time: "2026-11-10T12:00:00+0000",
            from: { id: "page-123" },
          }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        )
    );

    const result = await fetchFacebookPost({
      postId: "page-123_456",
      pageAccessToken: "secret-page-token",
      appSecret: "secret-app-key",
      fetcher,
    });

    const [url, init] = fetcher.mock.calls[0];
    expect(String(url)).not.toContain("secret-page-token");
    expect(String(url)).toContain("appsecret_proof=");
    expect(init?.headers).toMatchObject({ Authorization: "Bearer secret-page-token" });
    expect(result).toMatchObject({
      id: "page-123_456",
      authorPageId: "page-123",
      createdTime: "2026-11-10T12:00:00+0000",
    });
  });
});
