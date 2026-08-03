import { PortableTextComponents } from "next-sanity";
import { Link } from "@/i18n/navigation";
import { SanityImage } from "../image/SanityImage";

export const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-4">{children}</p>,

    h1: ({ children }) => <h1 className="heading-1 mb-6">{children}</h1>,

    h2: ({ children }) => <h2 className="heading-2 mb-5">{children}</h2>,

    h3: ({ children }) => <h3 className="heading-3 mb-4">{children}</h3>,

    h4: ({ children }) => <h4 className="heading-4 mb-3">{children}</h4>,

    h5: ({ children }) => <h5 className="heading-5 mb-3">{children}</h5>,

    h6: ({ children }) => <h6 className="heading-6 mb-2">{children}</h6>,

    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 pl-4 italic">{children}</blockquote>
    ),
  },

  marks: {
    // Bold
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,

    // Italic
    em: ({ children }) => <em className="italic">{children}</em>,

    // Underline
    underline: ({ children }) => <span className="underline">{children}</span>,

    // Strikethrough
    "strike-through": ({ children }) => <span className="line-through">{children}</span>,

    // Inline code
    code: ({ children }) => (
      <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm">{children}</code>
    ),

    // Link
    link: ({ children, value }) => {
      const target = value?.blank ? "_blank" : undefined;

      return (
        <Link
          prefetch={false}
          href={value.href}
          target={target}
          rel={target === "_blank" ? value?.rel || "noopener noreferrer" : undefined}
          className="underline"
        >
          {children}
        </Link>
      );
    },

    // Text color
    textColor: ({ children, value }) => {
      const colorClasses: Record<string, string> = {
        black: "text-black",
        gray: "text-gray-500",
        white: "text-white",
        red: "text-red-500",
        blue: "text-blue-500",
        green: "text-green-500",
      };

      return <span className={colorClasses[value?.color] || ""}>{children}</span>;
    },
  },

  list: {
    bullet: ({ children }) => <ul className="mb-4 ml-6 list-disc">{children}</ul>,

    number: ({ children }) => <ol className="mb-4 ml-6 list-decimal">{children}</ol>,
  },

  listItem: {
    bullet: ({ children }) => <li className="mb-1">{children}</li>,

    number: ({ children }) => <li className="mb-1">{children}</li>,
  },

  types: {
    image: ({ value }) => {
      if (value?.asset?._ref || value?.asset?._id) {
        return (
          <figure className="my-6">
            <SanityImage image={value} alt={value.alt || ""} className="rounded-lg" />

            {value.caption && (
              <figcaption className="mt-2 text-sm text-gray-500">{value.caption}</figcaption>
            )}
          </figure>
        );
      }

      return null;
    },

    externalImage: ({ value }) => {
      if (!value?.url) return null;

      return (
        <figure className="my-6">
          <img src={value.url} alt={value.alt || ""} className="rounded-lg" />

          {value.caption && (
            <figcaption className="mt-2 text-sm text-gray-500">{value.caption}</figcaption>
          )}
        </figure>
      );
    },

    spacer: ({ value }) => {
      const sizes = {
        small: "h-4",
        medium: "h-8",
        large: "h-16",
      };

      return (
        <div aria-hidden="true" className={sizes[value?.size as keyof typeof sizes] || "h-8"} />
      );
    },
  },
};
