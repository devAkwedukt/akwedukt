import { Button } from "@/components/ui/Button";
import { SanityImage } from "@/sanity/image/SanityImage";
import type { TeacherBenefitsSection } from "@/sanity/typegen";

export default function TeacherBenefitsSection({ item }: { item: TeacherBenefitsSection }) {
  if (!item.cards?.length) return null;

  return (
    <div className="w-full px-20 py-14 bg-[#f0f5fc] flex justify-between items-start">
      {item.image && (
        <SanityImage
          image={item.image}
          className="size-[500px] object-cover"
          width={500}
          height={500}
        />
      )}
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-6">
          {item.title && (
            <h2 className="w-[640px] text-[#103770] text-[56px] font-bold font-serif leading-[59.36px]">
              {item.title}
            </h2>
          )}
          <div className="flex flex-col gap-4">
            {item.subtitle && (
              <div className="w-[560px] text-[#103770] text-2xl font-bold leading-[31.20px]">
                {item.subtitle}
              </div>
            )}
            {item.description && (
              <div className="w-[598px] text-[#103770] text-lg leading-[28.80px]">
                {item.description}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex gap-8">
            {item.cards.slice(0, 2).map((card, index) => (
              <div key={index} className="w-[330px] p-4 bg-neutral-50 flex flex-col gap-4">
                {card.title && (
                  <div className="text-[#103770] text-xl font-bold leading-6">{card.title}</div>
                )}
                {card.description && (
                  <div className="text-[#103770] text-base leading-[25.60px]">
                    {card.description}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex gap-8">
            {item.cards.slice(2, 4).map((card, index) => (
              <div key={index + 2} className="w-[330px] p-4 bg-neutral-50 flex flex-col gap-4">
                {card.title && (
                  <div className="text-[#103770] text-xl font-bold leading-6">{card.title}</div>
                )}
                {card.description && (
                  <div className="text-[#103770] text-base leading-[25.60px]">
                    {card.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {item.buttonText && item.buttonUrl && (
          <Button as="link" href={item.buttonUrl} variant="primary" size="large">
            {item.buttonText}
          </Button>
        )}
      </div>
    </div>
  );
}
