import { Button } from "@/components/ui/Button";
import { SanityImage } from "@/sanity/image/SanityImage";
import type { POST_BY_ID_QUERY_RESULT, Slug } from "@/sanity/typegen";
import { getCategoryColor } from "@/constants/categories";

// Type for post with expanded categories (using typegen structure)
type PostWithExpandedCategories = Exclude<POST_BY_ID_QUERY_RESULT, null>;

interface PostsGridProps {
  posts: PostWithExpandedCategories[];
  ctaText?: string;
}

export function PostsGrid({ posts, ctaText = "Czytaj dalej" }: PostsGridProps) {
  if (!posts || posts.length === 0) {
    return null;
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

  return (
    <main className="grid grid-cols-3 gap-8 mt-12">
      {posts.map((post) => (
        <div key={post._id} className="overflow-hidden flex">
          <div className="flex flex-col h-full w-full">
            {/* IMAGE OF POST */}
            {post.featuredMedia && (
              <div className="">
                <SanityImage
                  image={post.featuredMedia}
                  className="w-full h-90 object-cover"
                  alt={post.title || ""}
                />
              </div>
            )}

            {/* TEXT CONTENT OF POST */}
            <div className="pt-6 flex flex-col grow">
              <div className="flex items-center gap-2 mb-2">
                {post.date && (
                  <div className="text-md text-gray-600">
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                )}
                {post.categories && post.categories.length > 0 && post.date && (
                  <span className="text-gray-400">•</span>
                )}
                {post.categories && post.categories.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {post.categories.slice(0, 1).map((category) => (
                      <span
                        key={category._id}
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-[#103770] ${getCategoryColor(category.name)}`}
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <h3 className="heading-3 text-blue-900 mb-2">{post.title}</h3>

              {/* SHORT EXCERPT - 2 lines with ellipsis */}
              {(post.excerpt || post.content) && (
                <div className="mb-6 text-gray-600 line-clamp-2 leading-relaxed">
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
        </div>
      ))}
    </main>
  );
}
