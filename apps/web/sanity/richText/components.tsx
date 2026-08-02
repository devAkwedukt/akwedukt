import { PortableTextComponents } from "next-sanity";
import { Link } from "@/i18n/navigation";
import { SanityImage } from "../image/SanityImage";

/**
 * Configures components rendered from Portable Text blocks in Sanity
 * @see https://github.com/portabletext/react-portabletext
 */
export const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="">{children}</p>,
    h1: ({ children }) => <h1 className="heading-1">{children}</h1>,
    h2: ({ children }) => <h2 className="heading-2">{children}</h2>,
    h3: ({ children }) => <h3 className="heading-3">{children}</h3>,
    h4: ({ children }) => <h4 className="heading-4">{children}</h4>,
    h5: ({ children }) => <h5 className="heading-4">{children}</h5>,
    h6: ({ children }) => <h6 className="heading-4">{children}</h6>,
    blockquote: ({ children }) => <blockquote className="italic">{children}</blockquote>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => {
      const target = value.href.startsWith("http") ? "_blank" : undefined;
      return (
        <Link
          prefetch={false}
          href={value.href}
          target={target}
          rel="noopener noreferrer"
          className="underline"
        >
          {children}
        </Link>
      );
    },
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc ml-6">{children}</ul>,
  },
  listItem: {
    bullet: ({ children }) => <li className="mb-1">{children}</li>,
  },
  types: {
    image: ({ value }) => {
      // Portable Text images have asset as a reference object with _ref
      if (!value) {
        return null;
      }
      if (value?.asset?._ref || value?.asset?._id) {
        return <SanityImage image={value} alt={value.alt || ""} className="my-4 rounded-lg" />;
      }
    },
    externalImage: ({ value }) => {
      return <img src={value.url} alt={value.alt || ""} className="my-4 rounded-lg" />;
    },
  },
};
