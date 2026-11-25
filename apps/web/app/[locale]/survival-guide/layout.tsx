import type { ReactNode } from "react";
import { client } from "@/sanity/client";

export default async function GuideLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const artwork = await client.fetch(
    '*[_type == "home" && locale == $locale][0].sections[_type == "heroBackgroundSection" && enabled != false][0].slides[0]{"desktopUrl": backgroundImage.asset->url, "mobileUrl": backgroundImageMob.asset->url}',
    { locale },
    { perspective: "published", stega: false, cache: "no-store" }
  );
  const desktopUrl = artwork?.desktopUrl ?? artwork?.mobileUrl;
  const mobileUrl = artwork?.mobileUrl ?? artwork?.desktopUrl;

  return (
    <div className="relative isolate min-h-[70vh] overflow-hidden bg-gray-50">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 hidden bg-[length:100%_auto] bg-top bg-repeat-y md:block"
        style={{ backgroundImage: desktopUrl ? `url("${desktopUrl}")` : undefined }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[length:100%_auto] bg-top bg-repeat-y md:hidden"
        style={{ backgroundImage: mobileUrl ? `url("${mobileUrl}")` : undefined }}
      />
      {children}
    </div>
  );
}
