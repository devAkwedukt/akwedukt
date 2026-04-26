"use client";

import clsx from "clsx";
import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import Link from "next/link";
import { RenderIcon, IconType } from "./RenderIcon";

type IconButtonSize = "small" | "medium" | "large" | "xlarge";
type IconButtonShape = "circle" | "square";

type CommonIconButtonProps = {
  icon: IconType;
  size?: IconButtonSize;
  shape?: IconButtonShape;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  "aria-label"?: string;
  "aria-describedby"?: string;
  "aria-expanded"?: boolean;
  "aria-pressed"?: boolean;
};

type IconButtonAsButton = CommonIconButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: "button";
    href?: never;
    target?: never;
  };

type IconButtonAsLink = CommonIconButtonProps & {
  as: "link";
  href: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  external?: boolean;
  prefetch?: boolean;
  replace?: boolean;
  scroll?: boolean;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "target">;

type IconButtonProps = IconButtonAsButton | IconButtonAsLink;

const sizeStyles: Record<IconButtonSize, string> = {
  small: "",
  medium: "",
  large: "",
  xlarge: "",
};

const squareSizeStyles: Record<IconButtonSize, string> = {
  small: "w-4 h-4 rounded-sm",
  medium: "w-6 h-6 rounded-sm",
  large: "w-8 h-8 rounded-sm",
  xlarge: "w-12 h-12 rounded-sm",
};

const shapeStyles: Record<IconButtonShape, string> = {
  circle:
    "bg-transparent text-deep-navy-blue-900 outline outline-2 outline-offset-[-1px] outline-deep-navy-blue-900 hover:bg-blue-200 hover:text-blue-700 hover:outline hover:outline-2 hover:outline-offset-[-1px] hover:outline-blue-700 hover:cursor-pointer active:bg-blue-700 active:text-neutral-50 active:outline-none focus:outline focus:outline-2 focus:outline-offset-[-1px] focus:outline-[#c20a9a] disabled:bg-gray-200 disabled:text-gray-700 disabled:outline-none disabled:cursor-not-allowed rounded-full",
  square:
    "bg-transparent text-[#103770] hover:bg-blue-200 hover:text-[#103770] hover:cursor-pointer active:bg-blue-700 active:text-[#FAFAFA] focus:outline focus:outline-4 focus:outline-offset-[-2px] focus:outline-pink-400 disabled:bg-gray-200 disabled:text-gray-700 disabled:cursor-not-allowed",
};

export function IconButton({
  icon,
  size = "medium",
  shape = "circle",
  className,
  disabled = false,
  loading = false,
  as = "button",
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
  "aria-expanded": ariaExpanded,
  "aria-pressed": ariaPressed,
  ...rest
}: IconButtonProps) {
  const isDisabled = disabled || loading;

  const commonProps = {
    className: clsx(
      "inline-flex items-center justify-center font-semibold transition",
      shape === "square" ? squareSizeStyles[size] : sizeStyles[size],
      shapeStyles[shape],
      loading && "cursor-wait opacity-75",
      className
    ),
    style:
      shape === "circle"
        ? {
            width:
              size === "small"
                ? "20px"
                : size === "medium"
                  ? "28px"
                  : size === "large"
                    ? "36px"
                    : "52px",
            height:
              size === "small"
                ? "20px"
                : size === "medium"
                  ? "28px"
                  : size === "large"
                    ? "36px"
                    : "52px",
          }
        : undefined,
    disabled: isDisabled,
    "aria-label": ariaLabel,
    "aria-describedby": ariaDescribedBy,
    "aria-expanded": ariaExpanded,
    "aria-pressed": ariaPressed,
    "aria-busy": loading,
  };

  const content = (
    <>
      {loading && (
        <span className="flex animate-spin">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </span>
      )}
      {!loading && icon && (
        <span className="flex">
          <RenderIcon
            icon={icon}
            size={
              shape === "square"
                ? size === "small"
                  ? 16
                  : size === "medium"
                    ? 24
                    : size === "large"
                      ? 32
                      : 48
                : size === "small"
                  ? 16
                  : size === "medium"
                    ? 24
                    : size === "large"
                      ? 32
                      : 48
            }
          />
        </span>
      )}
    </>
  );

  if (as === "link") {
    const {
      href,
      target,
      external = false,
      prefetch = true,
      replace = false,
      scroll = true,
      ...linkRest
    } = rest as IconButtonAsLink;

    // Check if it's an external link
    const isExternal =
      external ||
      target === "_blank" ||
      href.startsWith("http") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:");

    if (isExternal) {
      return (
        <a
          href={href}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
          {...commonProps}
          {...linkRest}
        >
          {content}
        </a>
      );
    }

    // Internal link using Next.js Link
    return (
      <Link
        href={href}
        prefetch={prefetch}
        replace={replace}
        scroll={scroll}
        {...commonProps}
        {...linkRest}
      >
        {content}
      </Link>
    );
  }

  const {
    type = "button",
    form,
    formAction,
    formMethod,
    formTarget,
    formNoValidate,
    ...buttonRest
  } = rest as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <div
      className={
        shape === "circle"
          ? "flex items-center justify-center p-1"
          : "flex items-center justify-center"
      }
    >
      <button
        type={type}
        form={form}
        formAction={formAction}
        formMethod={formMethod}
        formTarget={formTarget}
        formNoValidate={formNoValidate}
        {...commonProps}
        {...buttonRest}
      >
        {content}
      </button>
    </div>
  );
}
