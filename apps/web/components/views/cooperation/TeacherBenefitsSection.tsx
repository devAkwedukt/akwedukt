import { Button } from "@/components/ui/Button";
import { SanityImage } from "@/sanity/image/SanityImage";
import type { TeacherBenefitsSection } from "@/sanity/typegen";

export default function TeacherBenefitsSection({ item }: { item: TeacherBenefitsSection }) {
  if (!item.cards?.length) return null;

  return (
    <section className="max-w-480 w-full px-20 py-16 2xl:py-20 bg-deep-navy-blue-50 flex justify-start 2xl:gap-[5%] gap-16 items-center">
      {item.image && (
        <SanityImage
          image={item.image}
          className="size-150 object-cover"
          width={600}
          height={600}
        />
      )}

      <article className="flex flex-col gap-12">
        <header className="flex flex-col gap-6">
          {item.title && <h2 className="heading-2">{item.title}</h2>}
          <div className="flex flex-col gap-0">
            {item.subtitle && <p className="text-2xl font-bold">{item.subtitle}</p>}
            {item.description && <p className="text-lg">{item.description}</p>}
          </div>
        </header>

        <main className="flex flex-col gap-6">
          <div className="flex gap-8">
            {item.cards.slice(0, 2).map((card: any, index: number) => (
              <div
                key={index}
                className="w-75 2xl:w-auto max-w-85 p-6 bg-gray-50 flex flex-col gap-4"
              >
                {card.title && (
                  <p className="text-xl font-bold leading-6 text-balance">{card.title}</p>
                )}
                {card.description && <p className="text-base text-balance">{card.description}</p>}
              </div>
            ))}
          </div>

          <div className="flex gap-8">
            {item.cards.slice(2, 4).map((card: any, index: number) => (
              <div
                key={index + 2}
                className="w-75 2xl:w-auto max-w-85 p-6 bg-gray-50 flex flex-col gap-4"
              >
                {card.title && (
                  <p className="text-xl font-bold leading-6 text-balance">{card.title}</p>
                )}
                {card.description && <p className="text-base text-balance">{card.description}</p>}
              </div>
            ))}
          </div>
        </main>

        {item.buttonText && item.buttonUrl && (
          <Button
            as="link"
            href={item.buttonUrl}
            variant="primary"
            size="large"
            className="min-h-15"
          >
            {item.buttonText}
          </Button>
        )}
      </article>
    </section>
  );
}
