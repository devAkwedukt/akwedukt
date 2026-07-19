"use client";

import { useState } from "react";
import type { DocumentsTabSection } from "@/sanity/typegen";
import { SanityFile } from "@/sanity/file/SanityFile";
import { IconButton } from "@/components/ui/IconButton";

type Props = {
  section: DocumentsTabSection;
};

export default function DocumentsTabSection({ section }: Props) {
  const tabs = section.tabs ?? [];
  const [activeTab, setActiveTab] = useState(0);

  const documents = tabs[activeTab]?.documents ?? [];

  return (
    <section className="py-16 xl:py-24">
      <div className="container mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="max-w-3xl">
          <h2 className="heading-2 mb-16 text-primary">{section.title}</h2>

          {section.description && (
            <p className="body-base mt-6 text-primary">{section.description}</p>
          )}
        </div>

        {/* Tabs */}
        <div className="mt-10 flex flex-wrap gap-2 border-b border-primary/20 pb-4">
          {tabs.map((tab, index) => (
            <button
              key={tab._key}
              onClick={() => setActiveTab(index)}
              className={[
                "px-4 py-2 text-base transition rounded-full",
                activeTab === index
                  ? "border border-primary text-primary"
                  : "text-primary hover:border hover:border-primary/40",
              ].join(" ")}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* Documents */}
        <div className="mt-12 flex flex-col gap-12">
          {documents.map((document) => (
            <article key={document._key} className="pt-4 flex flex-col gap-6">
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-primary">{document.title}</h3>

                {document.description && (
                  <p className="body-base text-primary">{document.description}</p>
                )}
              </div>

              <SanityFile file={document.file} className="w-fit !active:bg-red-500">
                <div className="font-semibold tracking-wide flex items-center gap-2 pr-1 py-0.5">
                  {document.buttonText || "Pobierz"}
                  <IconButton
                    icon="download"
                    shape="square"
                    className="hover:bg-transparent active:bg-transparent active:text-deep-navy-blue-900"
                  />
                </div>
              </SanityFile>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
