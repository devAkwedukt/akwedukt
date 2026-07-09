import { cn } from "@/lib/utils";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav
      className={cn(
        "pt-10 pb-2 inline-flex items-center flex-wrap justify-start px-6 md:px-20",
        className
      )}
    >
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <span className="px-1 text-sm font-bold text-gray-950">/</span>}
          {item.href ? (
            <Link
              href={item.href}
              className="text-nowrap px-2 text-base font-bold text-gray-950 hover:text-ocean-green-700 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="px-2 text-base font-bold text-ocean-green-700 text-nowrap">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
