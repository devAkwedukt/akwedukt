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
    <div className={`inline-flex justify-center items-center gap-3.25 md:gap-4 z-30 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className={clsx(
            "p-1 w-3 h-3 rounded-full transition-all duration-300 ease",
            index === selectedIndex
              ? "bg-deep-navy-blue-900 w-9"
              : "bg-deep-navy-blue-300 cursor-pointer hover:bg-deep-navy-blue-400"
          )}
        />
      ))}
    </div>
  );
}
