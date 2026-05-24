"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface Category {
  _id: string;
  name: string;
  slug: { current: string };
}

export function usePostSearch(initialCategories: Category[] = []) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  // Use server-provided categories
  useEffect(() => {
    setCategories(initialCategories);
  }, [initialCategories]);

  // Initialize state from URL params
  useEffect(() => {
    const query = searchParams.get("search");
    const categoryParams = searchParams.getAll("category");

    if (query) setSearchQuery(query);
    if (categoryParams.length > 0) setSelectedCategories(categoryParams);
  }, [searchParams]);

  // Update URL when search state changes
  const updateURL = useCallback(
    (query: string, cats: string[]) => {
      const params = new URLSearchParams();

      if (query.trim()) {
        params.set("search", query.trim());
      }

      cats.forEach((cat) => {
        params.append("category", cat);
      });

      // Reset to page 1 when search changes
      params.set("page", "1");

      const newURL = `${window.location.pathname}?${params.toString()}`;
      router.push(newURL, { scroll: false });
    },
    [router]
  );

  const handleSearchChange = useCallback(
    (query: string) => {
      setSearchQuery(query);
      updateURL(query, selectedCategories);
    },
    [selectedCategories, updateURL]
  );

  const toggleCategory = useCallback(
    (categoryId: string) => {
      const newCategories = selectedCategories.includes(categoryId)
        ? selectedCategories.filter((id) => id !== categoryId)
        : [...selectedCategories, categoryId];

      setSelectedCategories(newCategories);
      updateURL(searchQuery, newCategories);
    },
    [selectedCategories, searchQuery, updateURL]
  );

  const clearAllFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedCategories([]);
    updateURL("", []);
  }, [updateURL]);

  const hasActiveFilters = searchQuery.trim().length > 0 || selectedCategories.length > 0;

  return {
    searchQuery,
    selectedCategories,
    categories,
    hasActiveFilters,
    handleSearchChange,
    toggleCategory,
    clearAllFilters,
  };
}
