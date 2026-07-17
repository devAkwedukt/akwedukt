"use client";

import { Button } from "@/components/ui/Button";
import { usePostSearch } from "@/hooks/usePostSearch";
import { getCategoryColor, getColorHex } from "@/constants/categories";

interface Tag {
  _id: string;
  name: string;
  slug: { current: string };
}

interface SearchFilterProps {
  serverTags?: Tag[];
}

export function SearchFilter({ serverTags }: SearchFilterProps) {
  const {
    searchQuery,
    selectedTags,
    tags,
    handleSearchChange,
    toggleTag,
    clearAllFilters,
    hasActiveFilters,
  } = usePostSearch(serverTags);

  return (
    <div className="max-w-480 mx-auto mb-8 space-y-6">
      {/* Search Input */}
      <div className="relative w-100 mx-auto">
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2  w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          //FIGMA: 'Wyszukaj projekt'
          placeholder="Szukaj w tytułach i treści..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border-2 border-deep-navy-blue-900 rounded-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-deep-navy-blue-700"
        />
        {searchQuery && (
          <button
            onClick={() => handleSearchChange("")}
            className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 hover:text-deep-navy-blue-500 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Tag Filters */}
      <div className="flex flex-col gap-2 mx-auto justify-center items-center max-w-480">
        {/* <h4 className="heading-4 font-semibold">Tagi</h4> */}
        {tags.length === 0 ? (
          <h4 className="heading-4 font-semibold mt-4">No tags found</h4>
        ) : (
          <div className="flex flex-wrap justify-center items-center gap-12 mt-5">
            {tags.map((tag) => {
              const isSelected = selectedTags.includes(tag._id);
              const bgColor = getCategoryColor(tag.name);
              return (
                <Button
                  key={tag._id}
                  variant="filter"
                  size="xs"
                  rightIcon={isSelected ? "close" : "add"}
                  onClick={() => toggleTag(tag._id)}
                  style={isSelected ? { backgroundColor: getColorHex(bgColor) } : undefined}
                >
                  {tag.name}
                </Button>
              );
            })}
          </div>
        )}
      </div>

      {/* Clear All Filters */}
      {hasActiveFilters && (
        <div className="flex justify-end">
          <button
            onClick={clearAllFilters}
            className="text-base cursor-pointer font-medium hover:text-deep-navy-blue-600 underline transition-colors"
          >
            Wyczyść wszystkie filtry
          </button>
        </div>
      )}

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="bg-gray-50 rounded-lg py-4">
          <div className="text-lg">
            {searchQuery && (
              <div className="mb-1">
                Szukanie: <span className="font-semibold">{searchQuery}</span>
              </div>
            )}
            {selectedTags.length > 0 && (
              <div>
                Wybrane tagi:{" "}
                <span className="font-semibold">
                  {selectedTags
                    .map((tagId) => tags.find((t) => t._id === tagId)?.name)
                    .filter(Boolean)
                    .join(", ") || "Brak"}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
