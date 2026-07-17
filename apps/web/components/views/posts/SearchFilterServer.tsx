import { getAllTags } from "@/sanity/queries/posts";
import { SearchFilter } from "./SearchFilter";

interface SearchFilterServerProps {
  initialTags?: any[];
}

export default async function SearchFilterServer({ initialTags }: SearchFilterServerProps = {}) {
  // Load tags on server side
  const tags = initialTags && initialTags.length > 0 ? initialTags : await getAllTags();

  return <SearchFilter serverTags={tags} />;
}
