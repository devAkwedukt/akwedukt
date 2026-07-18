import NotFound from "@/components/views/NotFound";

export default async function NotFoundPage({ params }: { params: Promise<{ locale: "pl" }> }) {
  const { locale } = await params;

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
      <NotFound homeHref={`/${locale}`} />
    </div>
  );
}
