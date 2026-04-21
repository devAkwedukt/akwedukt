"use client";

import { IconButton } from "../ui/IconButton";

export function IconButtonExamples() {
  return (
    <div>
      <div>
        {/* Circle with outline */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Circle (with outline)</h3>
          <div className="flex gap-4 items-center">
            <IconButton icon="arrow-left-alt" size="small" aria-label="Menu" />
            <IconButton icon="arrow-right-alt" size="medium" aria-label="Menu" />
            <IconButton icon="arrow-left-alt" size="large" aria-label="Menu" />
            <IconButton icon="arrow-right-alt" size="xlarge" aria-label="Menu" />
          </div>
          <div className="text-sm text-gray-600">
            Small (16px) • Medium (24px) • Large (32px) • XLarge (48px)
          </div>
        </div>

        {/* Square without outline */}
        <div className="space-y-4 mt-8">
          <h3 className="text-lg font-semibold">Square (without outline)</h3>
          <div className="flex gap-4 items-center">
            <IconButton icon="menu" shape="square" size="small" aria-label="Add" />
            <IconButton icon="facebook" shape="square" size="medium" aria-label="Add" />
            <IconButton icon="close" shape="square" size="large" aria-label="Add" />
            <IconButton icon="close" shape="square" size="xlarge" aria-label="Add" />
          </div>
          <div className="text-sm text-gray-600">
            Small (16px) • Medium (24px) • Large (32px) • XLarge (48px)
          </div>
        </div>

        {/* States */}
        <div className="space-y-4 mt-8">
          <h3 className="text-lg font-semibold">States</h3>
          <div className="flex gap-4 items-center">
            <IconButton icon="instagram" size="medium" aria-label="Normal" />
            <IconButton icon="add" size="medium" disabled aria-label="Disabled" />
            <IconButton icon="add" size="medium" loading aria-label="Loading" />
          </div>
          <div className="text-sm text-gray-600">Normal • Disabled • Loading</div>
        </div>

        {/* As links */}
        <div className="space-y-4 mt-8">
          <h3 className="text-lg font-semibold">As Links</h3>
          <div className="flex gap-4 items-center">
            <IconButton
              icon="arrow-forward-ios"
              shape="square"
              size="medium"
              as="link"
              href="/example"
              aria-label="External link"
            />
            <IconButton
              icon="arrow-right-alt"
              size="medium"
              as="link"
              href="/example"
              aria-label="Go to page"
            />
          </div>
          <div className="text-sm text-gray-600">Square link • Circle link</div>
        </div>
      </div>
    </div>
  );
}
