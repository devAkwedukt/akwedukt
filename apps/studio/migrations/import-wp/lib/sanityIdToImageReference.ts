import type { Post } from "../../../../web/sanity/typegen";

export function sanityIdToImageReference(id: string): Post["featuredMedia"] {
  return {
    _type: "image",
    asset: { _type: "reference", _ref: id },
  };
}
