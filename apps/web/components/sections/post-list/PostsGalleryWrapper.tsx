import { getLatestPosts, getNextPosts, getPostById } from "@/sanity/queries/posts";
import { PostsGrid } from "./PostsGrid";
import { Button } from "@/components/ui/Button";
import type { PostsGallerySection } from "@/sanity/typegen";
import { SanityImage } from "@/sanity/image/SanityImage";

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
    <>
      <section className="py-8 md:py-14 2xl:py-20 px-6 md:px-20 bg-gray-50 mx-auto relative">
        {item.topImage && (
          <SanityImage
            image={item.topImage}
            className="absolute md:-top-7.5 -top-15 2xl:right-40 right-1/12 md:right-30 scale-40 md:scale-100"
            width={96}
            height={93}
          />
        )}
        {item.topImage2 && (
          <SanityImage
            image={item.topImage2}
            className="absolute md:top-25 2xl:right-17.5 -top-1/50 -right-1/7 md:right-12.5 scale-40 md:scale-100"
            width={160}
            height={85}
          />
        )}
        <header className="max-w-250 mx-auto">
          {item.title && (
            <h2 className="font-bold heading-2 text-left md:text-center mb-4">{item.title}</h2>
          )}
          {item.subtitle && (
            <p className="text-base md:text-lg text-left md:text-center text-balance">
              {item.subtitle}
            </p>
          )}
        </header>

        <PostsGrid posts={filteredPosts} ctaText={item.ctaText} />

        {item.seeAllPostsText && item.seeAllPostsUrl && (
          <div className="mt-14 flex justify-start md:justify-center">
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
        {item.bottomImage && (
          <SanityImage
            image={item.bottomImage}
            className="absolute bottom-10 right-10"
            width={129}
            height={95}
          />
        )}
      </section>

      {item.footerImage && (
        <SanityImage
          image={item.footerImage}
          className="w-full h-auto object-cover"
          width={1440}
          height={240}
        />
      )}
    </>
  );
}
