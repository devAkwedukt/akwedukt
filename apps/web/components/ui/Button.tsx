"use client";

import clsx from "clsx";
import { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import Link from "next/link";
import { RenderIcon, IconType } from "./RenderIcon";

type ButtonSize = "xs" | "small" | "medium" | "large";
type ButtonVariant = "primary" | "secondary" | "link" | "filter";

type CommonButtonProps = {
  children: ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
  leftIcon?: IconType;
  rightIcon?: IconType;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  "aria-label"?: string;
  "aria-describedby"?: string;
  "aria-expanded"?: boolean;
  "aria-pressed"?: boolean;
};

type ButtonAsButton = CommonButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: "button";
    href?: never;
    target?: never;
  };

type ButtonAsLink = CommonButtonProps & {
  as: "link";
  href: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  external?: boolean;
  prefetch?: boolean;
  replace?: boolean;
  scroll?: boolean;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "target">;

type ButtonProps = ButtonAsButton | ButtonAsLink;

const sizeStyles: Record<ButtonSize, string> = {
  xs: "p-xs text-sm gap-xxs rounded-sm sm:text-base",
  small: "p-s text-sm gap-xxs rounded-lg",
  medium: "p-m text-sm gap-s rounded-xl sm:text-base",
  large: "p-m text-base gap-m rounded-xl sm:text-lg",
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-ocean-green-700 text-neutral-50 hover:bg-ocean-green-600 hover:cursor-pointer active:bg-ocean-green-800 focus:outline focus:outline-4 focus:outline-offset-[-2px] focus:outline-pink-400 disabled:bg-gray-200 disabled:text-gray-700 disabled:cursor-not-allowed",
  secondary:
    "bg-neutral-50 text-deep-navy-blue-900 outline outline-2 outline-offset-[-1px] outline-deep-navy-blue-900 hover:bg-blue-200 hover:text-blue-700 hover:outline hover:outline-[1.5px] hover:outline-offset-[-0.75px] hover:outline-blue-700 hover:cursor-pointer active:bg-blue-700 active:text-neutral-50 active:outline active:outline-[1.5px] active:outline-offset-[-0.75px] active:outline-blue-700 focus:outline focus:outline-4 focus:outline-offset-[-2px] focus:outline-pink-400 disabled:bg-gray-200 disabled:text-gray-700 disabled:outline-none disabled:cursor-not-allowed",
  link: "bg-transparent text-deep-navy-blue-900 hover:text-deep-navy-blue-900 hover:underline hover:cursor-pointer active:bg-blue-700 active:text-neutral-50 disabled:bg-gray-200 disabled:text-gray-700 disabled:cursor-not-allowed disabled:hover:no-underline",
  filter:
    "bg-transparent text-deep-navy-blue-900 outline outline-2 outline-offset-[-1px] outline-deep-navy-blue-900 hover:bg-blue-200 hover:text-blue-700 hover:outline hover:outline-[1.5px] hover:outline-offset-[-0.75px] hover:outline-blue-700 hover:cursor-pointer active:bg-blue-700 active:text-neutral-50 active:outline active:outline-[1.5px] active:outline-offset-[-0.75px] active:outline-blue-700 focus:outline focus:outline-4 focus:outline-offset-[-2px] focus:outline-pink-400 disabled:bg-gray-200 disabled:text-gray-700 disabled:outline-none disabled:cursor-not-allowed",
};

export function Button({
  children,
  size = "medium",
  variant = "primary",
  leftIcon,
  rightIcon,
  className,
  disabled = false,
  loading = false,
  as = "button",
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
  "aria-expanded": ariaExpanded,
  "aria-pressed": ariaPressed,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const commonProps = {
    className: clsx(
      "inline-flex items-center justify-center font-semibold transition",
      sizeStyles[size],
      variantStyles[variant],
      loading && "cursor-wait opacity-75",
      className
    ),
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
      {!loading && leftIcon && (
        <span className="flex">
          <RenderIcon
            icon={leftIcon}
            size={size === "xs" ? 24 : size === "large" ? 32 : 24}
            className={size === "xs" ? "sm:size-6 size-4" : ""}
          />
        </span>
      )}
      <span className={variant === "link" ? "underline-offset-4" : ""}>{children}</span>
      {!loading && rightIcon && (
        <span className="flex">
          <RenderIcon
            icon={rightIcon}
            size={size === "xs" ? 24 : size === "large" ? 32 : 24}
            className={size === "xs" ? "sm:size-6 size-4" : ""}
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
    } = rest as ButtonAsLink;

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
  );
}
