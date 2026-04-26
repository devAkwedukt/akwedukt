"use client";

import { IconButton } from "./IconButton";

type SliderArrowsProps = {
  onPrev: () => void;
  onNext: () => void;
  position: "left" | "right";
  className?: string;
};

export function SliderArrows({ onPrev, onNext, position, className }: SliderArrowsProps) {
  if (position === "left") {
    return (
      <IconButton
        icon="arrow-left-alt"
        shape="circle"
        size="large"
        onClick={(e) => {
          onPrev();
          e.currentTarget.blur();
        }}
        aria-label="Previous slide"
        className={className}
      />
    );
  }

  return (
    <IconButton
      icon="arrow-right-alt"
      shape="circle"
      size="large"
      onClick={(e) => {
        onNext();
        e.currentTarget.blur();
      }}
      aria-label="Next slide"
      className={className}
    />
  );
}
