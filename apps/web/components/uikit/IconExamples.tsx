"use client";

import { RenderIcon } from "@/components/ui";

// Extract all icon IDs from sprite.svg
const iconIds = [
  "text-size",
  "contrast",
  "arrow-back-ios",
  "arrow-forward-ios",
  "arrow-left-alt",
  "arrow-right-alt",
  "star",
  "phone",
  "mail",
  "location",
  "menu",
  "download-circle",
  "download",
  "copy",
  "add",
  "arrow-down",
  "arrow-up",
  "close",
  "filter",
  "linkedin",
  "facebook",
  "instagram",
  "match-case",
  "linkedin-alt",
  "tiktok",
  "edu-institution",
  "volunteer",
  "educator",
  "search",
  "pin",
  "check",
];

export default function IconExamples() {
  return (
    <div className="flex flex-col gap-8 p-6">
      <div>
        <h2 className="text-2xl font-bold mb-6">Icon Library</h2>
        <p className="text-gray-600 mb-8">All available icons from sprite.svg</p>
      </div>

      {/* Grid of all icons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
        {iconIds.map((iconId) => (
          <div
            key={iconId}
            className="flex flex-col items-center gap-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RenderIcon icon={iconId} size={24} className="text-gray-700" />
            <span className="text-xs text-center text-gray-600 font-mono">{iconId}</span>
          </div>
        ))}
      </div>

      {/* Size variations */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Size Variations</h3>
        <div className="flex gap-8 items-center">
          <div className="flex flex-col items-center gap-2">
            <RenderIcon icon="star" size={16} />
            <span className="text-xs text-gray-600">16</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <RenderIcon icon="star" size={24} />
            <span className="text-xs text-gray-600">24</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <RenderIcon icon="star" size={32} />
            <span className="text-xs text-gray-600">32</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <RenderIcon icon="star" size={48} />
            <span className="text-xs text-gray-600">48</span>
          </div>
        </div>
      </div>

      {/* Color variations */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Color Variations</h3>
        <div className="flex gap-8 items-center">
          <div className="flex flex-col items-center gap-2">
            <RenderIcon icon="star" size={24} className="text-red-500" />
            <span className="text-xs text-gray-600">Red</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <RenderIcon icon="star" size={24} className="text-blue-500" />
            <span className="text-xs text-gray-600">Blue</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <RenderIcon icon="star" size={24} className="text-green-500" />
            <span className="text-xs text-gray-600">Green</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <RenderIcon icon="star" size={24} className="text-yellow-500" />
            <span className="text-xs text-gray-600">Yellow</span>
          </div>
        </div>
      </div>
    </div>
  );
}
