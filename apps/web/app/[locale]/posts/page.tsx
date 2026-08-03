import { getPosts, getTotalPostsCount, getAllTags } from "@/sanity/queries/posts";
import { PostsGrid } from "@/components/sections/post-list/PostsGrid";
import { Pagination } from "@/components/ui/Pagination";
import SearchFilterServer from "@/components/views/posts/SearchFilterServer";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui";
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";

interface PostsPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    page?: string;
    tag?: string | string[];
    search?: string;
  }>;
}

const POSTS_PER_PAGE = 12;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Wszystkie posty | Stowarzyszenie Akwedukt",
    description: "Przeglądaj wszystkie nasze posty",
  };
}

export default async function PostsPage({ params, searchParams }: PostsPageProps) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;

  setRequestLocale(locale);
  const currentPage = parseInt(resolvedSearchParams.page || "1", 10);

  const tagFilter = resolvedSearchParams.tag;
  const searchQuery = resolvedSearchParams.search;

  const offset = (currentPage - 1) * POSTS_PER_PAGE;

  const [posts, totalCount, tags] = await Promise.all([
    getPosts(POSTS_PER_PAGE, offset, tagFilter, "publish", searchQuery),
    getTotalPostsCount(tagFilter, "publish", searchQuery),
    getAllTags(),
  ]);

  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);
  const filteredPosts = posts.filter(Boolean);

  return (
    <section className="mx-auto px-6 md:px-20 bg-gray-50">
      <Breadcrumbs
        items={[
          { label: "Strona główna", href: `/${locale}` },
          { label: "Co nowego", href: `/${locale}/co-nowego` },
          { label: "Kronika wydarzeń" },
        ]}
        className="px-0!"
      />

      <header className="text-left md:text-center mb-12 pt-16 relative">
        <h1 className="heading-1 mb-6">Kronika wydarzeń</h1>
        <p className="text-lg">
          Zobacz galerię naszych wspomnień i poczuj rytm, w jakim bije serce naszej społeczności
        </p>

        <Image
          src="/postsDoodle.svg"
          alt="doodle"
          height="200"
          width="300"
          className="hidden md:flex absolute 2xl:left-1/10 3xl:left-1/8 top-1/8 "
        />

        <Image
          src="/postsMobileDoodle.svg"
          alt="doodle"
          height="200"
          width="300"
          className="flex md:hidden absolute right-1/7 translate-x-1/2 -translate-y-1/2 top-1/7 scale-40"
        />
      </header>

      <SearchFilterServer initialTags={tags} />

      {filteredPosts.length > 0 ? (
        <>
          <PostsGrid posts={filteredPosts} />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            tagFilter={tagFilter}
            searchQuery={searchQuery}
          />

          {/* Results count */}
          <p className="text-lg text-center py-8 pb-18">
            Pokazano {filteredPosts.length} z {totalCount} postów
          </p>
        </>
      ) : (
        <div className="text-center py-14">
          <h2 className="heading-2 mb-4">Nie znaleziono postów</h2>
          <p className="text-lg">Nie znaleziono postów pasujących do wybranych kryteriów.</p>
        </div>
      )}
    </section>
  );
}
