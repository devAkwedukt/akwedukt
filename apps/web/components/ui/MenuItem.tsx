"use client";

import clsx from "clsx";
import Link from "next/link";
import { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type CommonProps = {
  children: ReactNode;
  selected?: boolean;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  "aria-label"?: string;
  "aria-current"?: boolean;
};

type ButtonMenuItemProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type AnchorMenuItemProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type MenuItemProps = ButtonMenuItemProps | AnchorMenuItemProps;

const getStateStyles = (selected: boolean) => {
  if (selected) {
    return "text-blue-700";
  }

  return "text-deep-navy-blue-900 cursor-pointer hover:underline hover:disabled:no-underline disabled:cursor-not-allowed active:bg-blue-700 active:text-neutral-50 focus-visible:text-deep-navy-blue-900 focus-visible:bg-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-1px] focus-visible:outline-pink-400 focus-visible:rounded-sm sm:text-deep-navy-blue-900 sm:hover:underline sm:active:bg-transparent sm:active:text-blue-700 sm:active:underline sm:focus-visible:text-deep-navy-blue-900 sm:focus-visible:bg-transparent sm:focus-visible:outline sm:focus-visible:outline-2 sm:focus-visible:outline-offset-[-1px] sm:focus-visible:outline-pink-400 sm:focus-visible:rounded-sm";
};

export function MenuItem(props: MenuItemProps) {
  const {
    children,
    selected = false,
    className,
    onClick,
    disabled = false,
    "aria-label": ariaLabel,
    "aria-current": ariaCurrent,
    ...rest
  } = props;

  const baseClasses =
    "MenuItem flex justify-start items-center gap-2.5 transition-colors duration-200 p-2";
  const stateStyles = getStateStyles(selected);
  const sizeClasses =
    "text-sm font-semibold leading-[14px] tracking-tight no-underline sm:text-base sm:leading-4 sm:no-underline";

  const classes = clsx(
    baseClasses,
    stateStyles,
    sizeClasses,
    disabled && "opacity-50 cursor-not-allowed",
    className
  );

  const commonProps = {
    className: classes,
    onClick: disabled ? undefined : onClick,
    "aria-label": ariaLabel,
    "aria-current": ariaCurrent ?? selected,
  };

  // Type guard to determine if this is an anchor
  if ("href" in props && props.href && !disabled) {
    return (
      <Link
        href={props.href}
        {...commonProps}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      {...commonProps}
      disabled={disabled}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
