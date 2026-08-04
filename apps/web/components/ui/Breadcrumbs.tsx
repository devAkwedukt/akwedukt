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
    <nav className={cn("pt-10 pb-2 w-full px-6 md:px-20 3xl:px-0", className)}>
      <div className="max-w-480 mx-auto flex items-center flex-wrap justify-start">
        {items.map((item, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && <span className="px-0.5 md:px-1 text-sm font-bold text-gray-950">/</span>}
            {item.href ? (
              <Link
                prefetch={false}
                href={item.href}
                className="break-words px-1 md:px-2 text-base font-bold text-gray-950 hover:text-ocean-green-700 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="break-words px-2 text-base font-bold text-ocean-green-700">
                {item.label}
              </span>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
