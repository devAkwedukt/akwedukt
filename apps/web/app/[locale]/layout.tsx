import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import { sanityFetch, SanityLive } from "@/sanity/live";
import { Toaster } from "sonner";
import { SanityPreview } from "@/sanity/preview/SanityPreview";
import { mapMetadata } from "@/sanity/metadata/mapMetadata";
import { q } from "@/sanity/groqd";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
//import { Link } from "@/i18n/navigation";
//import { locales } from "@/i18n/locales";
import Navbar from "@/components/reusable/navbar/Navbar";
import Footer from "@/components/reusable/footer/Footer";
import LenisScrollProvider from "@/components/UtilitiesComponents/LenisScrollProvider";

/** This is the base metadata for the entire project, it will cascade down to subpages
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function */

export async function generateMetadata(): Promise<Metadata> {
  const seo = q.star
    .filterByType("settings")
    .slice(0)
    .project((sub) => ({ seo: sub.field("seo") }));
  const { data } = await sanityFetch({
    query: seo.query,
    params: { page: "settings" },
    stega: false, // always set `stega: false` in Next's `generate` functions
  });
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_ORIGIN),
    ...mapMetadata(seo.parse(data)),
  };
}

/** Since we are using a dynamic route segment for the [locale] param, we need to
 *  instruct Next.js what params exist so that it may pre-generate pages */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/** Setup font optimization
 * @see https://nextjs.org/docs/app/getting-started/fonts */

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-fraunces",
});

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Validating locale at root layout ensures it is valid everywhere
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale); // Enables static rendering, this should be done in every page/layout

  return (
    <html lang="pl">
      <body className={`${fraunces.variable} ${jakarta.variable} antialiased`}>
        <NextIntlClientProvider>
          <Navbar />

          {/*
          <div className="flex justify-center gap-3 uppercase pt-5">
            {locales.map((l) => (
              <Link key={l} href="/" locale={l}>
                {l}
              </Link>
            ))}
          </div>
          */}

          <div className="pt-16">{children}</div>
          <Footer />
          <LenisScrollProvider />
          <Toaster />
          <SanityPreview />
        </NextIntlClientProvider>
      </body>
      <SanityLive />
    </html>
  );
}
