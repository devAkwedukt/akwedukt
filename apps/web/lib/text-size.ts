export const TEXT_SIZE_STORAGE_KEY = "akwedukt:text-size";
export const DEFAULT_TEXT_SIZE = "default";
export const LARGE_TEXT_SIZE = "large";
export const EXTRA_LARGE_TEXT_SIZE = "extra-large";

export const TEXT_SIZE_STAGES = [
  DEFAULT_TEXT_SIZE,
  LARGE_TEXT_SIZE,
  EXTRA_LARGE_TEXT_SIZE,
] as const;

export type TextSize = (typeof TEXT_SIZE_STAGES)[number];

export const isTextSize = (value: unknown): value is TextSize =>
  typeof value === "string" && TEXT_SIZE_STAGES.includes(value as TextSize);

export const getNextTextSize = (current: TextSize): TextSize => {
  const currentIndex = TEXT_SIZE_STAGES.indexOf(current);

  return TEXT_SIZE_STAGES[(currentIndex + 1) % TEXT_SIZE_STAGES.length];
};
