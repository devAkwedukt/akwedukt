import type { ReactNode } from "react";
import { client } from "@/sanity/client";
import { SanityImage } from "@/sanity/image/SanityImage";

export default async function GuideLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const artwork = await client.fetch(
    '*[_type == "home" && locale == $locale][0].sections[_type == "heroBackgroundSection" && enabled != false][0].slides[0]{backgroundImage, backgroundImageMob}',
    { locale },
    { perspective: "published", stega: false, cache: "no-store" }
  );
  const desktopImage = artwork?.backgroundImage ?? artwork?.backgroundImageMob;
  const mobileImage = artwork?.backgroundImageMob ?? artwork?.backgroundImage;

  return (
    <div className="relative isolate min-h-[70vh] overflow-hidden bg-gray-50">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10">
        <SanityImage
          image={desktopImage}
          alt=""
          sizes="100vw"
          className="hidden h-[550px] w-full object-cover object-top md:block"
        />
        <SanityImage
          image={mobileImage}
          alt=""
          sizes="100vw"
          className="h-[500px] w-full object-cover object-top md:hidden"
        />
      </div>
      {children}
    </div>
  );
}
