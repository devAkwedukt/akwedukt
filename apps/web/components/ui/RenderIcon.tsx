import { forwardRef } from "react";

interface RenderIconProps extends React.SVGAttributes<SVGSVGElement> {
  icon?: string;
  size?: number | string;
  className?: string;
}

export const RenderIcon = forwardRef<SVGSVGElement, RenderIconProps>(
  ({ icon, size = 24, className = "", ...props }, ref) => {
    if (!icon) return null;

    // Check if icon needs 24x24 viewBox
    const is24x24Icon = icon === "download-circle";
    const viewBox = is24x24Icon ? "0 0 24 24" : "0 0 16 16";

    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox={viewBox}
        className={`inline-block ${className}`}
        {...props}
      >
        <use href={`/icons/sprite.svg#${icon}`} />
      </svg>
    );
  }
);

RenderIcon.displayName = "RenderIcon";

export type IconType = string | undefined;
