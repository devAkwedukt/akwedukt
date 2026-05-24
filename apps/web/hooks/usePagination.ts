interface UsePaginationProps {
  currentPage: number;
  totalPages: number;
  maxVisiblePages?: number;
}

interface UsePaginationReturn {
  pages: number[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPage: number;
  previousPage: number;
}

export function usePagination({
  currentPage,
  totalPages,
  maxVisiblePages = 5,
}: UsePaginationProps): UsePaginationReturn {
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;
  const nextPage = Math.min(totalPages, currentPage + 1);
  const previousPage = Math.max(1, currentPage - 1);

  const pages = Array.from({ length: Math.min(maxVisiblePages, totalPages) }, (_, i) => {
    let pageNum;
    if (totalPages <= maxVisiblePages) {
      pageNum = i + 1;
    } else if (currentPage <= 3) {
      pageNum = i + 1;
    } else if (currentPage >= totalPages - 2) {
      pageNum = totalPages - 4 + i;
    } else {
      pageNum = currentPage - 2 + i;
    }
    return pageNum;
  });

  return {
    pages,
    hasNextPage,
    hasPreviousPage,
    nextPage,
    previousPage,
  };
}
