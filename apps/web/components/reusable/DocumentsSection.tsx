"use client";

import type { DocumentsSection } from "@/sanity/typegen";
//import { Button } from "../ui";
import { SanityFile } from "@/sanity/file/SanityFile";
import { IconButton } from "../ui/IconButton";

export default function DocumentsSection({ item }: { item: DocumentsSection }) {
  if (item.enabled === false) return null;

  const getBackgroundClass = () => {
    switch (item.backgroundColor) {
      case "neutral-50":
        return "bg-neutral-50";
      case "deep-navy-blue-50":
        return "bg-deep-navy-blue-50";
      default:
        return "bg-white";
    }
  };

  return (
    <section className={`w-full py-16 2xl:py-24 px-20 ${getBackgroundClass()}`}>
      {/* Header */}
      <div className="text-center mb-12">
        {item.title && <h2 className="heading-2 mb-6">{item.title}</h2>}
        {item.subtitle && <p className="body-lg">{item.subtitle}</p>}
      </div>

      {/* Documents Grid */}
      {item.documents && item.documents.length > 0 && (
        <main className="max-w-480 mx-auto  flex flex-row justify-start flex-wrap items-start gap-12">
          {item.documents.map((doc, index) => (
            <div key={index} className="flex flex-col gap-6 p-4 w-[calc((100%-6rem)/3)]">
              <div className="flex flex-col gap-1">
                {/* Name of the Document */}
                <h3 className="body-lg font-bold">{doc.name}</h3>
                {/* Optional Description */}
                {doc.description && <p className="body-medium font-medium">{doc.description}</p>}
              </div>
              {/* Download Button */}
              <SanityFile file={doc.file} className="w-fit">
                <div className="font-semibold tracking-wide flex items-center gap-2 ">
                  {doc.buttonText || "Pobierz"}
                  <IconButton icon="download" shape="square" />
                </div>
              </SanityFile>
            </div>
          ))}
        </main>
      )}
    </section>
  );
}
