import { Button } from "@/components/ui/Button";
import { SanityImage } from "@/sanity/image/SanityImage";
import type { InstitutionBenefitsSection } from "@/sanity/typegen";

export default function InstitutionBenefitsSection({ item }: { item: InstitutionBenefitsSection }) {
  if (!item.cards?.length) return null;

  return (
    <div className="w-full px-20 py-14 bg-[#f0f5fc] inline-flex justify-between items-start">
      {/* Image */}
      {item.image && (
        <SanityImage
          image={item.image}
          className="size-[600px] relative"
          width={600}
          height={600}
        />
      )}

      {/* Text Content */}
      <div className="w-[598px] inline-flex flex-col justify-start items-start gap-12">
        <div className="self-stretch flex flex-col justify-start items-start gap-6">
          {item.title && (
            <h2 className="w-[640px] justify-start text-[#103770] text-[56px] font-bold font-['Fraunces'] leading-[59.36px]">
              {item.title}
            </h2>
          )}
          <div className="self-stretch flex flex-col justify-start items-start gap-4">
            {item.subtitle && (
              <div className="w-[560px] justify-start text-[#103770] text-2xl font-bold font-['Plus_Jakarta_Sans'] leading-[31.20px]">
                {item.subtitle}
              </div>
            )}
            {item.description && (
              <div className="w-[598px] justify-start text-[#103770] text-lg font-normal font-['Plus_Jakarta_Sans'] leading-[28.80px]">
                {item.description}
              </div>
            )}
          </div>
        </div>

        {/* Cards */}
        <div className="w-[575px] flex flex-col justify-start items-start gap-6">
          <div className="self-stretch flex flex-col justify-start items-start gap-8">
            {item.cardsTitle && (
              <div className="w-[560px] justify-start text-[#103770] text-2xl font-bold font-['Plus_Jakarta_Sans'] leading-[31.20px]">
                {item.cardsTitle}
              </div>
            )}
            <div className="self-stretch flex flex-col justify-start items-start gap-6">
              {item.cards.map((card, index) => (
                <div
                  key={index}
                  className="self-stretch p-4 bg-neutral-50 flex flex-col justify-start items-start gap-4"
                >
                  {card.title && (
                    <div className="self-stretch justify-start text-[#103770] text-lg font-bold font-['Plus_Jakarta_Sans'] leading-[28.80px]">
                      {card.title}
                    </div>
                  )}
                  {card.description && (
                    <div className="self-stretch justify-start text-[#103770] text-base font-normal font-['Plus_Jakarta_Sans'] leading-[25.60px]">
                      {card.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Button */}
        {item.buttonText && item.buttonUrl && (
          <Button as="link" href={item.buttonUrl} variant="primary">
            {item.buttonText}
          </Button>
        )}
      </div>
    </div>
  );
}
