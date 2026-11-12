import { Button } from "@/components/ui/Button";
import { SanityImage } from "@/sanity/image/SanityImage";
import type { Post } from "@/sanity/typegen";
import { getCategoryColor } from "@/constants/categories";
import Link from "next/link";
import Image from "next/image";

// Type for post with expanded categories and tags (using typegen structure)
type PostWithExpandedCategories = Omit<Exclude<Post, null>, "categories" | "tags"> & {
  categories?: Array<{
    _key: string;
    _id: string;
    name?: string;
    slug?: { current?: string };
  }>;
  tags?: Array<{
    _key: string;
    _id: string;
    name?: string;
    slug?: { current?: string };
  }>;
};

interface PostsGridProps {
  posts: PostWithExpandedCategories[];
  ctaText?: string;
  layout?: "grid" | "masonry";
}

interface PostCardProps {
  post: PostWithExpandedCategories;
  ctaText: string;
  naturalImage?: boolean;
  mobileOrder?: number;
}

const truncateText = (text: string, maxLines: number = 2) => {
  const words = text.split(" ");
  const maxWords = maxLines * 10; // Approximate words per line
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "...";
};

const getExcerptText = (excerpt: any, content: any) => {
  const textContent = excerpt || content;
  if (!textContent) return "";

  // Handle array of blocks (Portable Text)
  if (Array.isArray(textContent)) {
    return textContent
      .map((block: any) => {
        if (block.children && Array.isArray(block.children)) {
          return block.children.map((child: any) => child.text || "").join("");
        }
        // Handle block with direct text
        if (block.text) {
          return block.text;
        }
        return "";
      })
      .join("")
      .trim();
  }

  // Handle single block or other formats
  if (typeof textContent === "object" && textContent.text) {
    return textContent.text;
  }

  // Handle string directly
  if (typeof textContent === "string") {
    return textContent;
  }

  return "";
};

function PostCard({ post, ctaText, naturalImage = false, mobileOrder }: PostCardProps) {
  return (
    <article
      className="group max-w-125 w-full flex"
      style={mobileOrder === undefined ? undefined : { order: mobileOrder }}
    >
      <div className="flex flex-col h-full w-full">
        {/* IMAGE OF POST */}
        {!!post.featuredMedia ? (
          <Link prefetch={false} href={`/post/${post.slug?.current}`}>
            <div className="overflow-hidden">
              <SanityImage
                image={post.featuredMedia}
                mode={naturalImage ? "contain" : "cover"}
                className={
                  naturalImage
                    ? "block w-full h-auto object-contain group-hover:opacity-90 transition-opacity ease duration-300"
                    : "w-full h-70 md:h-75 object-cover 2xl:h-90 group-hover:scale-104 transition-transform ease duration-400 delay-20 will-change-transform"
                }
                alt={post.title || ""}
              />
            </div>
          </Link>
        ) : (
          <Image
            src="/Picture_placeholder.png"
            width={800}
            height={600}
            className="w-full h-auto"
            alt="Picture placeholder"
          />
        )}

        {/* TEXT CONTENT OF POST */}
        <div className="pt-6 flex flex-col grow">
          <div className="flex items-center justify-between gap-2 mb-2">
            {post.date && (
              <div className="text-md">
                {new Date(post.date).toLocaleDateString("pl-PL", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            )}
            {/*post.tags && post.tags.length > 0 && post.date && (
                  <span className="">•</span>
                )*/}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {post.tags.slice(0, 1).map((tag) => (
                  <span
                    key={tag._id}
                    className={`inline-flex items-center px-2 py-1 rounded-sm text-sm font-medium ${getCategoryColor(tag.name)}`}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          <Link
            prefetch={false}
            href={`/post/${post.slug?.current}`}
            className="heading-3 mb-2 w-fit"
          >
            {post.title}
          </Link>

          {/* SHORT EXCERPT - 2 lines with ellipsis */}
          {(post.excerpt || post.content) && (
            <div className="mb-6 line-clamp-2 leading-relaxed text-balance">
              {truncateText(getExcerptText(post.excerpt, post.content))}
            </div>
          )}

          <Button
            as="link"
            href={`/post/${post.slug?.current}`}
            variant="link"
            size="medium"
            rightIcon="arrow-right-alt"
            className="mt-auto"
          >
            {ctaText}
          </Button>
        </div>
      </div>
    </article>
  );
}

export function PostsGrid({ posts, ctaText = "Czytaj dalej", layout = "grid" }: PostsGridProps) {
  if (!posts || posts.length === 0) {
    return null;
  }

  if (layout === "masonry") {
    const columns = Array.from(
      { length: 3 },
      () =>
        [] as Array<{
          post: PostWithExpandedCategories;
          originalIndex: number;
        }>
    );

    posts.forEach((post, originalIndex) => {
      columns[originalIndex % 3].push({ post, originalIndex });
    });

    const columnClasses = [
      "contents lg:flex lg:flex-col lg:gap-14 lg:pr-8",
      "contents lg:flex lg:flex-col lg:gap-14 lg:px-8 lg:border-l lg:border-deep-navy-blue-200",
      "contents lg:flex lg:flex-col lg:gap-14 lg:pl-8 lg:border-l lg:border-deep-navy-blue-200",
    ];

    return (
      <main className="max-w-480 mx-auto flex flex-col gap-10 mt-8 md:mt-12 lg:grid lg:grid-cols-3 lg:gap-0">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className={columnClasses[columnIndex]}>
            {column.map(({ post, originalIndex }) => (
              <PostCard
                key={post._id}
                post={post}
                ctaText={ctaText}
                naturalImage
                mobileOrder={originalIndex}
              />
            ))}
          </div>
        ))}
      </main>
    );
  }

  return (
    <main className="max-w-480 mx-auto grid grid-cols-1 md:grid-cols-[repeat(3,minmax(0,31.25rem))] md:justify-between gap-8 mt-8 md:mt-12 items-stretch">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} ctaText={ctaText} />
      ))}
    </main>
  );
}
