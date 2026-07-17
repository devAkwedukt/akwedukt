"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface Tag {
  _id: string;
  name: string;
  slug: { current: string };
}

export function usePostSearch(initialTags: Tag[] = []) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tags, setTags] = useState<Tag[]>(initialTags);

  // Use server-provided tags
  useEffect(() => {
    setTags(initialTags);
  }, [initialTags]);

  // Initialize state from URL params
  useEffect(() => {
    const query = searchParams.get("search");
    const tagParams = searchParams.getAll("tag");

    if (query) setSearchQuery(query);
    if (tagParams.length > 0) setSelectedTags(tagParams);
  }, [searchParams]);

  // Update URL when search state changes
  const updateURL = useCallback(
    (query: string, tags: string[]) => {
      const params = new URLSearchParams();

      if (query.trim()) {
        params.set("search", query.trim());
      }

      tags.forEach((tag) => {
        params.append("tag", tag);
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
      updateURL(query, selectedTags);
    },
    [selectedTags, updateURL]
  );

  const toggleTag = useCallback(
    (tagId: string) => {
      const newTags = selectedTags.includes(tagId)
        ? selectedTags.filter((id) => id !== tagId)
        : [...selectedTags, tagId];

      setSelectedTags(newTags);
      updateURL(searchQuery, newTags);
    },
    [selectedTags, searchQuery, updateURL]
  );

  const clearAllFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedTags([]);
    updateURL("", []);
  }, [updateURL]);

  const hasActiveFilters = searchQuery.trim().length > 0 || selectedTags.length > 0;

  return {
    searchQuery,
    selectedTags,
    tags,
    hasActiveFilters,
    handleSearchChange,
    toggleTag,
    clearAllFilters,
  };
}
