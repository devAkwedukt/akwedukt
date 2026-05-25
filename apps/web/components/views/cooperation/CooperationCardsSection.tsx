import { Button } from "@/components/ui/Button";
import type { CooperationCardsSection } from "@/sanity/typegen";

export default function CooperationCardsSection({ item }: { item: CooperationCardsSection }) {
  if (!item.cards?.length) return null;

  return (
    <div className="w-full px-20 py-12 bg-deep-navy-blue-50 flex flex-col items-center gap-14 overflow-hidden">
      <div className="w-full max-w-[1000px] flex flex-col items-center gap-6">
        {item.title && (
          <h2 className="w-full text-center text-foreground heading-2">{item.title}</h2>
        )}
        {item.subtitle && (
          <p className="w-full max-w-[800px] text-center text-foreground body-lg">
            {item.subtitle}
          </p>
        )}
      </div>
      <div className="w-full flex justify-start items-start gap-14">
        {item.cards.map((card, index) => (
          <div
            key={index}
            className="w-[360px] p-4 bg-neutral-50 flex justify-start items-start gap-6"
          >
            <div className="text-orange-500 text-[56px] font-bold leading-[59.36px]">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div className="w-full flex flex-col justify-start items-start gap-4">
              {card.title && <h3 className="w-full text-foreground heading-3">{card.title}</h3>}
              {card.description && (
                <p className="w-full text-foreground body-base">{card.description}</p>
              )}
              {card.buttonText && card.buttonUrl && (
                <Button
                  as="link"
                  href={card.buttonUrl}
                  variant="link"
                  rightIcon="arrow-right-alt"
                  size="small"
                >
                  {card.buttonText}
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
