"use client";

import { Button } from "@/components/ui/Button";
import { RenderIcon } from "@/components/ui/RenderIcon";
import type { SupportOptionsSection } from "@/sanity/typegen";
import { useState } from "react";

interface SupportOptionsSectionProps {
  item: SupportOptionsSection;
}

export default function SupportOptionsSection({ item }: SupportOptionsSectionProps) {
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [copiedTitle, setCopiedTitle] = useState(false);

  const copyToClipboard = async (text: string, type: "account" | "title") => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === "account") {
        setCopiedAccount(true);
        setTimeout(() => setCopiedAccount(false), 2000);
      } else {
        setCopiedTitle(true);
        setTimeout(() => setCopiedTitle(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <section className="px-6 py-8 md:py-14 2xl:py-18 md:px-20 bg-deep-navy-blue-50">
      <main className="max-w-480 mx-auto flex flex-col gap-20">
        <div className="flex flex-col md:flex-row justify-center items-start gap-12">
          {/* Donation Card */}
          <div className="flex-1 flex flex-col gap-4 md:gap-6">
            <h3 className="heading-3 md:text-4xl md:font-serif">{item.donationCard?.title}</h3>
            <p className="text-base leading-relaxed">{item.donationCard?.description}</p>

            <div className="flex items-start gap-2 md:gap-4">
              <span className="text-base leading-relaxed">
                <b>Konto:</b> {item.donationCard?.accountNumber}
              </span>
              <button
                onClick={() => copyToClipboard(item.donationCard?.accountNumber || "", "account")}
                className="cursor-pointer relative hover:text-deep-navy-blue-500 active:scale-95 transition-colors duration-225 ease"
                aria-label="Kopiuj numer konta"
              >
                <RenderIcon icon="copy" size={24} />
                {copiedAccount && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-deep-navy-blue-900 text-white text-xs px-2 py-1 rounded">
                    Skopiowano!
                  </span>
                )}
              </button>
            </div>

            <div className="flex items-start gap-2 md:gap-4">
              <span className="text-base leading-relaxed">
                <b>Tytuł:</b> {item.donationCard?.transferTitle}
              </span>
              <button
                onClick={() => copyToClipboard(item.donationCard?.transferTitle || "", "title")}
                className="cursor-pointer relative hover:text-deep-navy-blue-500 active:scale-95 transition-colors duration-225 ease"
                aria-label="Kopiuj tytuł przelewu"
              >
                <RenderIcon icon="copy" size={24} />
                {copiedTitle && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-deep-navy-blue-900 text-white text-xs px-2 py-1 rounded">
                    Skopiowano!
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Fundraising Card */}
          <div className="flex-1 flex flex-col gap-4 md:gap-6">
            <h3 className="heading-3 md:text-4xl md:font-serif">{item.fundraisingCard?.title}</h3>
            <p className="text-base leading-relaxed">{item.fundraisingCard?.description}</p>
            <Button
              as="link"
              href={item.fundraisingCard?.buttonLink || "#"}
              variant="primary"
              rightIcon="arrow-right-alt"
            >
              {item.fundraisingCard?.buttonText}
            </Button>
          </div>

          {/* Volunteer Card */}
          <div className="flex-1 flex flex-col gap-4 md:gap-6">
            <h3 className="heading-3 md:text-4xl md:font-serif">{item.volunteerCard?.title}</h3>
            <p className="text-base leading-relaxed">{item.volunteerCard?.description}</p>
            <Button
              as="link"
              href={item.volunteerCard?.buttonLink || "#"}
              variant="secondary"
              rightIcon="arrow-right-alt"
            >
              {item.volunteerCard?.buttonText}
            </Button>
          </div>
        </div>
      </main>
    </section>
  );
}
