import { Button } from "@/components/ui/Button";
import type { CooperationCardsSection } from "@/sanity/typegen";

export default function CooperationCardsSection({ item }: { item: CooperationCardsSection }) {
  if (!item.cards?.length) return null;

  return (
    <section className="w-full px-20 py-16 bg-gray-50 flex flex-col items-center gap-14 overflow-hidden">
      <header className="flex flex-col justify-center items-center gap-6">
        {item.title && <h2 className="heading-2">{item.title}</h2>}
        {item.subtitle && <p className="body-lg">{item.subtitle}</p>}
      </header>

      <main className="w-full flex justify-between items-start gap-14">
        {item.cards.map((card, index) => (
          <div
            key={index}
            className="w-3/10 p-6 bg-deep-navy-blue-50 flex justify-start items-start gap-12"
          >
            <div className="w-full flex flex-col justify-start items-start gap-4">
              <h2 className="heading-2 text-orange-500">{String(index + 1).padStart(2, "0")}</h2>
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
          </div>
        ))}
      </main>
    </section>
  );
}
