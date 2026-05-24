import { PortableText } from "next-sanity";
import { components } from "./components";
import { ImageSlider } from "./ImageSlider";

/**
 * Renders Sanity blocks (Portable Text).
 * @param value - Block object fetched from Sanity
 * @param withImageSlider - If true, extracts images and displays them in a slider at the end
 */
export function SanityRichText({
  value = [],
  withImageSlider = false,
}: {
  value: Array<any> | null | undefined;
  withImageSlider?: boolean;
}) {
  if (!Array.isArray(value)) return null;

  // Extract all images from the portable text if withImageSlider is enabled
  const images = withImageSlider
    ? value
        .filter((block) => block._type === "image" || block._type === "externalImage")
        .map((block) => ({
          _type: block._type,
          asset: block.asset,
          url: block.url,
          alt: block.alt,
        }))
    : [];

  // Filter out image blocks from the content if withImageSlider is enabled
  const contentWithoutImages = withImageSlider
    ? value.filter((block) => block._type !== "image" && block._type !== "externalImage")
    : value;

  return (
    <>
      <PortableText
        value={contentWithoutImages}
        components={components}
        onMissingComponent={(message, _options) => console.warn(message)}
      />
      {images.length > 0 && <ImageSlider images={images} />}
    </>
  );
}
