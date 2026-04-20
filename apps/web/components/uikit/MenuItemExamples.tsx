"use client";

import { MenuItem } from "../ui/MenuItem";

export function MenuItemExamples() {
  return (
    <div className="space-y-4">
      {/* With accessibility */}
      <div className="space-y-2">
        <h3 className="body-base-bold">Variants</h3>
        <div className="flex flex-wrap gap-2">
          <MenuItem aria-label="About our company">Basic</MenuItem>
          <MenuItem selected aria-label="Go to home page" aria-current>
            Selected
          </MenuItem>
          <MenuItem disabled aria-label="Contact information">
            Disabled
          </MenuItem>
        </div>
      </div>
    </div>
  );
}
