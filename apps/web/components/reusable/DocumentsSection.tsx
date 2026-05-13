"use client";

import type { DocumentsSection } from "@/sanity/typegen";
import { Button } from "@/components/ui/Button";
import { SanityFile } from "@/sanity/file/SanityFile";

export default function DocumentsSection({ item }: { item: DocumentsSection }) {
  if (item.enabled === false) return null;

  return (
    <section className="w-full py-16 lg:py-24">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          {item.title && <h2 className="heading-2 mb-4">{item.title}</h2>}
          {item.subtitle && <p className="body-large text-neutral-600">{item.subtitle}</p>}
        </div>

        {/* Documents Grid */}
        {item.documents && item.documents.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {item.documents.map((doc, index) => (
              <div key={index} className="p-6 hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <h3 className="body-medium font-medium">{doc.name}</h3>

                  {/* Optional Description */}
                  {doc.description && <p className="body-small">{doc.description}</p>}

                  {/* Download Button */}
                  <SanityFile file={doc.file}>{doc.buttonText || "Pobierz"}</SanityFile>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
