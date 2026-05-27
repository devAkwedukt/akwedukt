---
description: How to create a new section in the project
---

# Creating a New Section

Follow these steps to add a new section to the project:

## 1. Create the Sanity Schema

Create a new schema file in `apps/studio/schemaTypes/sections/` (e.g., `myNewSection.ts`):

```ts
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "myNewSection",
  title: "My New Section",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    // Add more fields as needed
  ],
});
```

## 2. Add to Schema Index

Add the import and export to `apps/studio/schemaTypes/index.ts`:

```ts
import myNewSection from "./sections/myNewSection";

export const schemaTypes = [
  // ... existing types
  myNewSection,
];
```

## 3. Generate TypeScript Types

Run the type generation command to create types from the schema:

```bash
pnpm --filter studio run typegen
```

This will update `apps/web/sanity/typegen.ts` with your new section type.

## 4. Create the React Component

Create the component in `apps/web/components/reusable/` (e.g., `MyNewSection.tsx`):

```tsx
"use client";

import type { MyNewSection } from "@/sanity/typegen";

interface MyNewSectionProps {
  item: MyNewSection;
}

export default function MyNewSection({ item }: MyNewSectionProps) {
  return (
    <section className="px-5 py-14 md:px-20">
      <div className="max-w-1280 mx-auto">
        {/* Use semantic HTML and existing components */}
        <h3 className="text-deep-navy-blue-900 font-serif font-bold text-4xl">{item.title}</h3>
      </div>
    </section>
  );
}
```

## 5. Add to Components Mapping

Add the component to `apps/web/sanity/sections/components.tsx`:

```tsx
import MyNewSection from "@/components/reusable/MyNewSection";

// In the sections object:
myNewSection: MyNewSection,
```

## Important Rules

### Use Typegen Types

Always import types from `@/sanity/typegen`, never define them manually:

```tsx
import type { MyNewSection } from "@/sanity/typegen";
```

### Minimize Inline Styles

Use CSS classes from `globals.css` instead of inline styles:

```tsx
// ❌ Bad
<div style={{ padding: "20px", color: "blue" }}>

// ✅ Good
<div className="px-5 py-14 text-deep-navy-blue-900">
```

### Use UI Components

Use components from `@/components/ui/` instead of raw HTML:

```tsx
import { Button } from "@/components/ui/Button";
import { RenderIcon } from "@/components/ui/RenderIcon";

// ✅ Use Button component
<Button as="link" href={item.link} variant="primary">
  {item.text}
</Button>

// ✅ Use RenderIcon for icons
<RenderIcon icon="arrow-right" size={24} />
```

### Use Sprite Icons

Icons are available in `public/icons/sprite.svg`. Use the icon name with RenderIcon:

```tsx
<RenderIcon icon="copy" size={24} />
```

### Semantic HTML

Use proper semantic tags:

- `<section>` for sections
- `<h3>` for section headings
- `<button>` for interactive elements

### Optional Chaining

Always use optional chaining for Sanity fields:

```tsx
{
  item.title;
} // ❌ Might crash if undefined
{
  item?.title;
} // ✅ Safe
```

### Fallback Values

Provide fallbacks for required props:

```tsx
href={item?.link || "#"} // ✅ Safe fallback
```

### Image Handling

Use the `SanityImage` component for all Sanity images. Do NOT use `urlFor`:

```tsx
import { SanityImage } from "@/sanity/image/SanityImage";

// ✅ Correct
<SanityImage
  image={item.image}
  alt={item?.title || ""}
  width={600}
  height={600}
  className="w-full h-auto object-cover rounded-lg"
/>;

// ❌ Wrong - urlFor is not available
import { urlFor } from "@/sanity/client";
<Image src={urlFor(item.image).url()} />;
```
