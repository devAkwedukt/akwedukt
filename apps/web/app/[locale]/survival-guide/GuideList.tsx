"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";

export type GuideItem = {
  _id: string;
  title: string;
  keywords: string[] | null;
};

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ł/g, "l");
}

const titleOrder = new Intl.Collator("en", {
  sensitivity: "base",
  numeric: true,
});

export default function GuideList({ items }: { items: GuideItem[] }) {
  const [search, setSearch] = useState("");
  const query = normalize(search.trim());
  const results = items
    .filter((item) =>
      [item.title, ...(item.keywords ?? [])].some((text) => normalize(text).includes(query))
    )
    .sort(
      (first, second) =>
        titleOrder.compare(first.title, second.title) || first._id.localeCompare(second._id)
    );

  return (
    <section lang="en" className="mt-8 space-y-5">
      <label className="block font-semibold" htmlFor="guide-search">
        Find a topic
      </label>
      <input
        id="guide-search"
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className="w-full rounded-lg border border-deep-navy-blue-200 bg-white px-4 py-3 text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean-green-700"
      />
      {results.length ? (
        <ul className="list-disc space-y-1 pl-6 marker:text-ocean-green-700">
          {results.map((item) => (
            <li key={item._id} className="pl-1">
              <Link
                className="block min-h-11 break-words py-3 font-bold leading-relaxed underline decoration-deep-navy-blue-200 underline-offset-4 hover:text-ocean-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean-green-700"
                href={`/survival-guide/${encodeURIComponent(item._id)}`}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p role="status">
          {items.length ? "No matching topics." : "Guide articles are coming soon."}
        </p>
      )}
    </section>
  );
}
