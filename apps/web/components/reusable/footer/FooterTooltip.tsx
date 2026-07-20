"use client";

import { RenderIcon } from "@/components/ui";
import React, { useState } from "react";

function FooterTooltip({ copyText }: { copyText: string }) {
  const [copiedAccount, setCopiedAccount] = useState(false);

  const copyToClipboard = async (text: string, type: "account") => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === "account") {
        setCopiedAccount(true);
        setTimeout(() => setCopiedAccount(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button
      onClick={() => copyToClipboard(copyText, "account")}
      className="flex cursor-pointer relative hover:text-deep-navy-blue-300 active:scale-95 transition-colors duration-200 ease-in-out"
      aria-label="Kopiuj numer konta"
    >
      <RenderIcon icon="copy" size={24} />
      {copiedAccount && (
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-background text-foreground text-xs px-2 py-1 rounded">
          Skopiowano!
        </span>
      )}
    </button>
  );
}

export default FooterTooltip;
