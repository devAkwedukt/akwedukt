"use client";

import { useState, useEffect } from "react";
import { SanityImage } from "@/sanity/image/SanityImage";
import { cn } from "@/lib/utils";

interface AnimatedImageProps {
  imageData: any;
  index: number;
}

export function AnimatedImage({ imageData, index }: AnimatedImageProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const getPositionClasses = (position: string) => {
    switch (position) {
      case "top-right":
        return "top-[-6%] left-[29%] lg:top-[-19%] lg:left-[77%]";
      case "bottom-left":
        return "top-[77%] left-[72%] lg:top-[61%] lg:left-[18%]";
      case "bottom-right":
        return "hidden lg:block top-[76%] left-[70%]";
      case "center":
        return "top-[52%] left-[0%] sm:left-[10%] lg:top-[45%] lg:left-[30%]";
      default:
        return "top-[12%] left-[26%]";
    }
  };

  const getSizeClasses = (position: string) => {
    switch (position) {
      case "top-right":
        return "w-[277px] h-[145px] md:w-[364] md:h-[206]";
      case "bottom-left":
        return "w-[103px] h-[100px] md:w-[146] md:h-[171]";
      case "bottom-right":
        return "w-[201px] h-[106px]";
      case "center":
        return "w-[68px] h-[75px] md:w-[91px] md:h-[94px]";
      default:
        return "w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28";
    }
  };

  return (
    <div
      className={cn(
        "absolute",
        "z-0",
        "transition-all",
        "duration-300",
        getSizeClasses(imageData.position),
        getPositionClasses(imageData.position),
        isVisible ? "animate-grow" : "scale-0 opacity-0"
      )}
    >
      <SanityImage
        image={imageData.image}
        alt={`Animated decorative image ${index + 1}`}
        className="w-full h-full object-contain"
      />
    </div>
  );
}
