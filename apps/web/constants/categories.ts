// Color mapping for categories using design system colors
export const CATEGORY_COLORS: Record<string, string> = {
  Prezentacje: "bg-blue-200",
  Projekt: "bg-orange-200",
  Spotkania: "bg-purple-200",
  Szkolenia: "bg-pink-200",
  Warsztaty: "bg-happy-green-200",
  Zbiórka: "bg-ocean-green-200",
};

// Array of colors for cycling through
const COLOR_ARRAY = [
  "bg-blue-200",
  "bg-orange-200",
  "bg-purple-200",
  "bg-pink-200",
  "bg-happy-green-200",
  "bg-ocean-green-200",
  "bg-yellow-200",
  "bg-red-200",
  "bg-indigo-200",
  "bg-teal-200",
];

// CSS color values for inline styles
export const COLOR_HEX_MAP: Record<string, string> = {
  "bg-blue-200": "#bfdbfe",
  "bg-orange-200": "#fed7aa",
  "bg-purple-200": "#e9d5ff",
  "bg-pink-200": "#fbcfe8",
  "bg-happy-green-200": "#bbf7d0",
  "bg-ocean-green-200": "#99f6e4",
  "bg-yellow-200": "#fef08a",
  "bg-red-200": "#fecaca",
  "bg-indigo-200": "#c7d2fe",
  "bg-teal-200": "#99f6e4",
};

// Default color for categories not in the mapping
export const DEFAULT_CATEGORY_COLOR = "bg-yellow-200";

// Helper function to get category color (case-insensitive, with cycling for new tags)
export function getCategoryColor(categoryName: string | null | undefined): string {
  if (!categoryName) return DEFAULT_CATEGORY_COLOR;

  // Try exact match first
  if (CATEGORY_COLORS[categoryName]) {
    return CATEGORY_COLORS[categoryName];
  }

  // Try case-insensitive match
  const normalizedName = categoryName.toLowerCase();
  const matchedKey = Object.keys(CATEGORY_COLORS).find(
    (key) => key.toLowerCase() === normalizedName
  );

  if (matchedKey) {
    return CATEGORY_COLORS[matchedKey];
  }

  // For new tags, cycle through colors based on hash of the name
  let hash = 0;
  for (let i = 0; i < categoryName.length; i++) {
    hash = categoryName.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colorIndex = Math.abs(hash) % COLOR_ARRAY.length;
  return COLOR_ARRAY[colorIndex];
}

// Get hex color for inline styles
export function getColorHex(tailwindClass: string): string {
  return COLOR_HEX_MAP[tailwindClass] || "#fef08a";
}

// Get all available category names (useful for filters, etc.)
export function getCategoryNames(): string[] {
  return Object.keys(CATEGORY_COLORS);
}
