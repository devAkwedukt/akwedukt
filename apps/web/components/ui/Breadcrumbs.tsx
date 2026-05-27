import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="container inline-flex items-center justify-start">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <span className="px-1 text-sm font-bold text-gray-950">/</span>}
          {item.href ? (
            <Link
              href={item.href}
              className="px-2 text-base font-bold text-gray-950 hover:text-ocean-green-600 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="px-2 text-base font-bold text-ocean-green-600">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
