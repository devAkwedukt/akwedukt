import { IconButton } from "./IconButton";
import { usePagination } from "@/hooks/usePagination";
import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  categoryFilter?: string | string[];
  tagFilter?: string;
  searchQuery?: string;
  baseUrl?: string;
  maxVisiblePages?: number;
}

export function Pagination({
  currentPage,
  totalPages,
  categoryFilter,
  tagFilter,
  searchQuery,
  baseUrl = "/posts",
  maxVisiblePages = 5,
}: PaginationProps) {
  const { pages, hasNextPage, hasPreviousPage, nextPage, previousPage } = usePagination({
    currentPage,
    totalPages,
    maxVisiblePages,
  });

  const buildUrl = (page: number) => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    if (categoryFilter) {
      if (Array.isArray(categoryFilter)) {
        categoryFilter.forEach((cat) => params.append("category", cat));
      } else {
        params.set("category", categoryFilter);
      }
    }
    if (tagFilter) params.set("tag", tagFilter);
    if (searchQuery) params.set("search", searchQuery);
    const queryString = params.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-4">
      {/* Previous button */}
      <IconButton
        as="link"
        href={buildUrl(previousPage)}
        icon="arrow-left-alt"
        size="medium"
        shape="circle"
        disabled={!hasPreviousPage}
        aria-label="Poprzednia strona"
      />

      {/* Page numbers */}
      <div className="px-1 rounded-sm inline-flex justify-center items-center">
        {pages.map((pageNum) => (
          <Link
            key={pageNum}
            href={buildUrl(pageNum)}
            className={`text-base leading-[25.60px] transition text-center px-1 rounded-sm focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-pink-500 ${
              currentPage === pageNum
                ? "font-bold text-blue-700"
                : "hover:text-blue-700 hover:underline"
            }`}
          >
            {pageNum}
          </Link>
        ))}
      </div>

      {/* Next button */}
      <IconButton
        as="link"
        href={buildUrl(nextPage)}
        icon="arrow-right-alt"
        size="medium"
        shape="circle"
        disabled={!hasNextPage}
        aria-label="Następna strona"
      />
    </div>
  );
}
