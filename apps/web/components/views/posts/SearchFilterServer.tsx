import { getAllCategories } from "@/sanity/queries/posts";
import { SearchFilter } from "./SearchFilter";

interface SearchFilterServerProps {
  initialCategories?: any[];
}

export default async function SearchFilterServer({
  initialCategories,
}: SearchFilterServerProps = {}) {
  // Load categories on server side
  const categories =
    initialCategories && initialCategories.length > 0
      ? initialCategories
      : await getAllCategories();

  return <SearchFilter serverCategories={categories} />;
}
