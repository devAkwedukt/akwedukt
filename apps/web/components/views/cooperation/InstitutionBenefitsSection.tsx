import { Button } from "@/components/ui/Button";
import { SanityImage } from "@/sanity/image/SanityImage";
import type { InstitutionBenefitsSection } from "@/sanity/typegen";

export default function InstitutionBenefitsSection({ item }: { item: InstitutionBenefitsSection }) {
  if (!item.cards?.length) return null;

  return (
    <section className="max-w-480 w-full px-20 py-20 bg-gray-50 inline-flex justify-start gap-[5%] items-center">
      {/* Image */}
      {item.image && (
        <SanityImage
          image={item.image}
          className="size-150 relative object-contain"
          width={600}
          height={600}
        />
      )}

      {/* Text Content */}
      <aside className="inline-flex flex-col justify-start items-start gap-12 max-w-150">
        <header className="self-stretch flex flex-col justify-start items-start gap-6">
          {item.title && <h2 className="heading-2 justify-start">{item.title}</h2>}
          <div className="self-stretch flex flex-col justify-start items-start gap-4">
            {item.subtitle && <p className="justify-start text-2xl font-bold">{item.subtitle}</p>}
            {item.description && (
              <p className="justify-start text-lg font-normal">{item.description}</p>
            )}
          </div>
        </header>

        {/* Cards */}
        <div className="flex flex-col justify-start items-start gap-6">
          <div className="self-stretch flex flex-col justify-start items-start gap-6">
            {item.cardsTitle && (
              <h3 className="heading-3 justify-start font-bold">{item.cardsTitle}</h3>
            )}
            <div className="self-stretch flex flex-col justify-start items-start gap-6">
              {item.cards.map((card, index) => (
                <div
                  key={index}
                  className="self-stretch  bg-neutral-50 flex flex-col justify-start items-start gap-4"
                >
                  {card.title && (
                    <h4 className="heading-4 font-bold self-stretch justify-start">{card.title}</h4>
                  )}
                  {card.description && (
                    <p className="self-stretch justify-start text-base font-normal">
                      {card.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Button */}
        {item.buttonText && item.buttonUrl && (
          <Button as="link" href={item.buttonUrl} variant="primary" className="min-h-15">
            {item.buttonText}
          </Button>
        )}
      </aside>
    </section>
  );
}
