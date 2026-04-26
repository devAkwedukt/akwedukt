"use client";

import clsx from "clsx";

type SliderDotsProps = {
  count: number;
  selectedIndex: number;
  onSelect: (index: number) => void;
  className?: string;
};

export function SliderDots({ count, selectedIndex, onSelect, className }: SliderDotsProps) {
  return (
    <div className={`inline-flex justify-center items-center gap-2 z-30 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className={clsx(
            "w-2 h-2 rounded-full transition",
            index === selectedIndex
              ? "bg-deep-navy-blue-900"
              : "bg-deep-navy-blue-300 cursor-pointer hover:opacity-80"
          )}
        />
      ))}
    </div>
  );
}
