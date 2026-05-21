import { WP_TYPE_TO_SANITY_SCHEMA_TYPE } from "../constants";
import type { SanitySchemaType, WordPressDataType } from "../types";

function getTypeFromArgs(args: string[]): WordPressDataType | undefined {
  const equalStyle = args
    .find((arg) => arg.startsWith("--type="))
    ?.split("=")
    .pop();
  if (equalStyle) return equalStyle as WordPressDataType;

  const flagIndex = args.findIndex((arg) => arg === "--type");
  if (flagIndex >= 0 && args[flagIndex + 1]) {
    return args[flagIndex + 1] as WordPressDataType;
  }

  return undefined;
}

// Get WordPress type from CLI arguments, and the corresponding Sanity schema type
export function getDataTypes(args: string[]): {
  wpType: WordPressDataType;
  sanityType: SanitySchemaType;
} {
  const wpType =
    getTypeFromArgs(args) ??
    (process.env.WP_TYPE as WordPressDataType | undefined) ??
    (process.env.SANITY_WP_TYPE as WordPressDataType | undefined);
  const sanityType = wpType ? WP_TYPE_TO_SANITY_SCHEMA_TYPE[wpType] : undefined;

  if (!wpType || !sanityType) {
    throw new Error(
      `Invalid WordPress data type. Set WP_TYPE (or SANITY_WP_TYPE) to one of: ${Object.keys(
        WP_TYPE_TO_SANITY_SCHEMA_TYPE
      ).join(", ")}`
    );
  }

  return { wpType, sanityType };
}
