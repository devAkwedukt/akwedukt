import NotFound from "@/components/views/NotFound";

export default async function LocaleNotFound({ params }: { params: Promise<{ locale: "pl" }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams?.locale || "pl";

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
      <NotFound homeHref={`/${locale}`} />
    </div>
  );
}
