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
  if (section.enabled === false) return null;

  return (
    <section className="w-full py-8 md:py-16 2xl:py-24 px-6 md:px-20">
      <main className="max-w-480 mx-auto flex flex-col gap-12">
        {/* Header */}
        <header className="text-center flex flex-col gap-8">
          <h2 className="heading-2">{section.title}</h2>
          {section.description && <p className="text-base md:text-lg">{section.description}</p>}
        </header>

        {/* Tabs */}
        <div className="mt-14 flex flex-wrap justify-center">
          {tabs.map((tab, index) => (
            <button
              key={tab._key}
              onClick={() => setActiveTab(index)}
              className={[
                "px-4 py-2 border border-transparent text-base md:text-lg transition",
                activeTab === index
                  ? "border-deep-navy-blue-900!"
                  : "hover:border-deep-navy-blue-700/80 cursor-pointer",
              ].join(" ")}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* Documents */}
        <div className="mt-12 flex flex-col gap-12 ">
          {documents.map((document) => (
            <article
              key={document._key}
              className="py-6 flex flex-col gap-6 border-t border-deep-navy-blue-900"
            >
              <div className="flex flex-col gap-6">
                <h3 className="text-lg md:text-xl font-bold text-primary">{document.title}</h3>

                {document.description && (
                  <p className="text-base md:text-lg text-primary max-w-225 text-balance">
                    {document.description}
                  </p>
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
      </main>
    </section>
  );
}
