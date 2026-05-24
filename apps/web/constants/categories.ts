// Color mapping for categories using design system colors
export const CATEGORY_COLORS: Record<string, string> = {
  Prezentacje: "bg-blue-200",
  Projekt: "bg-orange-200",
  Spotkania: "bg-purple-200",
  Szkolenia: "bg-pink-200",
  Warsztaty: "bg-happy-green-200",
};

// Default color for categories not in the mapping
export const DEFAULT_CATEGORY_COLOR = "bg-yellow-200";

// Helper function to get category color
export function getCategoryColor(categoryName: string | null | undefined): string {
  return categoryName
    ? CATEGORY_COLORS[categoryName] || DEFAULT_CATEGORY_COLOR
    : DEFAULT_CATEGORY_COLOR;
}

// Get all available category names (useful for filters, etc.)
export function getCategoryNames(): string[] {
  return Object.keys(CATEGORY_COLORS);
}
