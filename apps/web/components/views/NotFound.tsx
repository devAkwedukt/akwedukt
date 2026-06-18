"use client";

import { Button } from "@/components/ui/Button";

interface NotFoundProps {
  homeHref: string;
}

export default function NotFound({ homeHref }: NotFoundProps) {
  return (
    <div className="max-w-480 mx-auto px-20 py-14 text-center">
      <div className="space-y-6">
        <p className="text-red-600 text-base font-bold">404 Error</p>
        <h1 className="text-red-600 text-5xl font-bold font-serif">Oops...</h1>
        <p className="text-lg text-left">
          Przepraszamy, wygląda na to że strona, której szukasz nie istnieje.
          <br />
          Skorzystaj z przydatnych linków.
        </p>
        <div className="flex justify-center">
          <Button variant="primary" leftIcon="arrow-left-alt" as="link" href={homeHref}>
            Strona główna
          </Button>
        </div>
      </div>
    </div>
  );
}
