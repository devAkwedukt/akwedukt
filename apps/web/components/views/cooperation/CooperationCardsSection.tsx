import { Button } from "@/components/ui/Button";
import type { CooperationCardsSection } from "@/sanity/typegen";

export default function CooperationCardsSection({ item }: { item: CooperationCardsSection }) {
  if (!item.cards?.length) return null;

  return (
    <section className="w-full p-6 md:px-20 py-12 md:py-16 2xl:py-18 bg-gray-50 flex flex-col items-center gap-14 overflow-hidden">
      <header className="flex flex-col justify-center items-center gap-6">
        {item.title && <h2 className="heading-2">{item.title}</h2>}
        {item.subtitle && <p className="body-base md:body-lg">{item.subtitle}</p>}
      </header>

      <main className="max-w-480 mx-auto flex flex-col md:flex-row justify-start items-stretch gap-6 md:gap-8 2xl:gap-14 flex-wrap">
        {item.cards.map((card, index) => (
          <div
            key={index}
            className="w-full md:w-[calc((100%-4rem)/3)] 2xl:w-[calc((100%-7rem)/3)] p-4 md:p-6 bg-deep-navy-blue-50 self-stretch flex flex-col justify-between items-start gap-2 md:gap-4 grow"
          >
            <h2 className="heading-2 text-orange-700">{String(index + 1).padStart(2, "0")}</h2>
            {card.title && <h3 className="w-full heading-3">{card.title}</h3>}
            {card.description && (
              <p className="w-full text-base text-balance">{card.description}</p>
            )}

            {card.buttonText && card.buttonUrl && (
              <Button
                as="link"
                href={card.buttonUrl}
                variant="link"
                rightIcon="arrow-right-alt"
                size="medium"
              >
                {card.buttonText}
              </Button>
            )}
          </div>
        ))}
      </main>
    </section>
  );
}
