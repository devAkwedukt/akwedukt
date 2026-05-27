"use client";

import { Button } from "@/components/ui/Button";
import { usePostSearch } from "@/hooks/usePostSearch";
import { getCategoryColor } from "@/constants/categories";

interface SearchFilterProps {
  serverCategories?: any[];
}

export function SearchFilter({ serverCategories }: SearchFilterProps) {
  const {
    searchQuery,
    selectedCategories,
    categories,
    handleSearchChange,
    toggleCategory,
    clearAllFilters,
    hasActiveFilters,
  } = usePostSearch(serverCategories);

  return (
    <div className="mb-8 space-y-6">
      {/* Search Input */}
      <div className="relative">
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
          placeholder="Szukaj w tytułach i treści..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border-2 border-deep-navy-blue-900 rounded-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => handleSearchChange("")}
            className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2  hover:text-deep-navy-blue-500 transition-colors"
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

      {/* Category Filters */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">Kategorie</h3>
        {categories.length === 0 ? (
          <div className="text-sm text-muted">No categories found</div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const isSelected = selectedCategories.includes(category._id);
              return (
                <Button
                  key={category._id}
                  variant="filter"
                  size="xs"
                  rightIcon={isSelected ? "close" : "add"}
                  onClick={() => toggleCategory(category._id)}
                  className={`${isSelected ? `${getCategoryColor(category.name)}` : ""}`}
                >
                  {category.name}
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
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-lg">
            {searchQuery && (
              <div className="mb-1">
                Szukanie: <span className="font-semibold">{searchQuery}</span>
              </div>
            )}
            {selectedCategories.length > 0 && (
              <div>
                Wybrane kategorie:{" "}
                <span className="font-semibold">
                  {selectedCategories
                    .map((catId) => categories.find((c) => c._id === catId)?.name)
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
