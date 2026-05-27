import { getPosts, getTotalPostsCount, getAllCategories } from "@/sanity/queries/posts";
import { PostsGrid } from "@/components/sections/post-list/PostsGrid";
import { Pagination } from "@/components/ui/Pagination";
import SearchFilterServer from "@/components/views/posts/SearchFilterServer";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui";
import { setRequestLocale } from "next-intl/server";

interface PostsPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    page?: string;
    category?: string | string[];
    tag?: string;
    search?: string;
  }>;
}

const POSTS_PER_PAGE = 12;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Wszystkie posty",
    description: "Przeglądaj wszystkie nasze posty",
  };
}

export default async function PostsPage({ params, searchParams }: PostsPageProps) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;

  setRequestLocale(locale);
  const currentPage = parseInt(resolvedSearchParams.page || "1", 10);

  const categoryFilter = resolvedSearchParams.category;
  const tagFilter = resolvedSearchParams.tag;
  const searchQuery = resolvedSearchParams.search;

  const offset = (currentPage - 1) * POSTS_PER_PAGE;

  const [posts, totalCount, categories] = await Promise.all([
    getPosts(POSTS_PER_PAGE, offset, categoryFilter, tagFilter, "publish", searchQuery),
    getTotalPostsCount(categoryFilter, tagFilter, "publish", searchQuery),
    getAllCategories(),
  ]);

  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);
  const filteredPosts = posts.filter(Boolean);

  return (
    <div className="container mx-auto px-4 py-12">
      <Breadcrumbs
        items={[
          { label: "Strona główna", href: `/${locale}` },
          { label: "Co nowego", href: `/${locale}/co-nowego` },
          { label: "Kronika wydarzeń" },
        ]}
      />
      <header className="text-center mb-12">
        <h1 className="heading-1 mb-4">Kronika wydarzeń</h1>
        <p className="text-lg text-gray-600">
          Zobacz galerię naszych wspomnień i poczuj rytm, w jakim bije serce naszej społeczności
        </p>
      </header>

      <SearchFilterServer initialCategories={categories} />

      {filteredPosts.length > 0 ? (
        <>
          <PostsGrid posts={filteredPosts} />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            categoryFilter={categoryFilter}
            tagFilter={tagFilter}
            searchQuery={searchQuery}
          />

          {/* Results count */}
          <div className="text-center mt-8 text-gray-600">
            Pokazano {filteredPosts.length} z {totalCount} postów
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <h2 className="heading-2 mb-4">Nie znaleziono postów</h2>
          <p className="text-gray-600">Nie znaleziono postów pasujących do wybranych kryteriów.</p>
        </div>
      )}
    </div>
  );
}
