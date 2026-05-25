import { getLatestPosts, getNextPosts, getPostById } from "@/sanity/queries/posts";
import { PostsGrid } from "./PostsGrid";
import { Button } from "@/components/ui/Button";
import type { PostsGallerySection } from "@/sanity/typegen";

interface PostsGalleryWrapperProps {
  item: PostsGallerySection;
}

export default async function PostsGalleryWrapper({ item }: PostsGalleryWrapperProps) {
  let posts;

  // If posts are manually selected, use them
  if (item.posts && item.posts.length > 0) {
    const postIds = item.posts.map((p) => p._ref).filter(Boolean);
    posts = await Promise.all(
      postIds.map(async (postId: string) => {
        return await getPostById(postId);
      })
    );
  } else {
    // Otherwise, load posts automatically based on variant
    if (item.variant === "latest") {
      posts = await getLatestPosts(item.limit ?? 3);
    } else if (item.variant === "next") {
      posts = await getNextPosts(item.limit ?? 3);
    } else {
      posts = await getLatestPosts(item.limit ?? 3);
    }
  }

  const filteredPosts = posts.filter(Boolean);

  return (
    <section className="py-18 px-20 bg-gray-50">
      {item.title && <h2 className="heading-2 text-center mb-4">{item.title}</h2>}
      {item.subtitle && <p className="text-lg text-center">{item.subtitle}</p>}

      <PostsGrid posts={filteredPosts} ctaText={item.ctaText} />

      {item.seeAllPostsText && item.seeAllPostsUrl && (
        <div className="mt-14 flex justify-center">
          <Button
            as="link"
            href={item.seeAllPostsUrl}
            variant={item.ctaVariant || "primary"}
            size="large"
          >
            {item.seeAllPostsText}
          </Button>
        </div>
      )}
    </section>
  );
}
