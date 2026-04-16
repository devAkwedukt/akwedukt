import { JSX, ReactNode } from "react";
import clsx from "clsx";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
};

export default function Container({ children, className, as: Component = "div" }: ContainerProps) {
  return (
    <Component className={clsx("mx-auto w-full px-4 sm:px-6 lg:px-8", "max-w-7xl", className)}>
      {children}
    </Component>
  );
}
