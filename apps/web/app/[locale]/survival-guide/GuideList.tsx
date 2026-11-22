"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";

export type GuideItem = { _id: string; title: string; keywords: string[] | null };

function normalize(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ł/g, "l");
}

export default function GuideList({items}: {items: GuideItem[]}) {
  const [search, setSearch] = useState("");
  const query = normalize(search.trim());
  const results = items.filter(item =>
    [item.title, ...(item.keywords ?? [])].some(text => normalize(text).includes(query))
  );
  return (
    <section lang="en" className="mt-6 space-y-4">
      <label className="block" htmlFor="guide-search">Find a topic</label>
      <input id="guide-search" type="search" value={search} onChange={event => setSearch(event.target.value)}
        className="w-full rounded border p-3" />
      {results.length ? <ul className="divide-y">{results.map(item =>
        <li key={item._id}><Link className="block py-4 underline" href={`/survival-guide/${encodeURIComponent(item._id)}`}>{item.title}</Link></li>
      )}</ul> : <p role="status">{items.length ? "No matching topics." : "Guide articles are coming soon."}</p>}
    </section>
  );
}
