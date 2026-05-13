"use client";

import { Button } from "@/components/ui/Button";

interface NotFoundProps {
  title: string;
  description: string;
  buttonText: string;
  homeHref: string;
  locale?: "pl" | "en";
}

export default function NotFound({
  title,
  description,
  buttonText,
  homeHref,
  locale = "pl",
}: NotFoundProps) {
  return (
    <div className="flex flex-col items-center justify-center px-20 py-14 bg-background min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-2xl text-center space-y-6">
        <div className="space-y-3">
          <p className="text-foreground text-base font-semibold leading-6">404 error</p>
          <h1 className="text-foreground text-6xl font-semibold leading-18">{title}</h1>
          <p className="text-muted text-xl font-normal leading-7.5">{description}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="secondary" onClick={() => window.history.back()} className="px-5 py-3">
            {locale === "pl" ? "Wróć do poprzedniej strony" : "Back to previous page"}
          </Button>
          <Button as="link" href={homeHref} className="px-5 py-3">
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
}
