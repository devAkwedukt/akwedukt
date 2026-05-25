import { Button } from "@/components/ui/Button";
import { SanityImage } from "@/sanity/image/SanityImage";

export default function CoalitionSection({ item }: { item: any }) {
  if (!item.cards?.length) return null;

  return (
    <div className="w-full px-20 py-14 bg-[#f0f5fc] flex justify-between items-start">
      <div className="flex flex-col items-start gap-12">
        {item.title && (
          <div className="w-[640px] text-[#103770] text-[56px] font-bold font-['Fraunces'] leading-[59.36px]">
            {item.title}
          </div>
        )}
        <div className="flex flex-col items-start gap-4">
          {item.subtitle && (
            <div className="w-[560px] text-[#103770] text-2xl font-bold font-['Plus_Jakarta_Sans'] leading-[31.20px]">
              {item.subtitle}
            </div>
          )}
          {item.description && (
            <div className="w-[598px] text-[#103770] text-lg font-normal font-['Plus_Jakarta_Sans'] leading-[28.80px]">
              {item.description}
            </div>
          )}
        </div>
        <div className="flex flex-col items-start gap-6">
          <div className="flex items-start gap-8">
            {item.cards.slice(0, 2).map((card: any, index: number) => (
              <div
                key={index}
                className="w-[330px] p-4 bg-neutral-50 flex flex-col items-start gap-4"
              >
                {card.title && (
                  <div className="text-[#103770] text-lg font-bold font-['Plus_Jakarta_Sans'] leading-[28.80px]">
                    {card.title}
                  </div>
                )}
                {card.description && (
                  <div className="text-[#103770] text-base font-normal font-['Plus_Jakarta_Sans'] leading-[25.60px]">
                    {card.description}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex items-start gap-8">
            {item.cards.slice(2, 4).map((card: any, index: number) => (
              <div
                key={index + 2}
                className="w-[330px] p-4 bg-neutral-50 flex flex-col items-start gap-4"
              >
                {card.title && (
                  <div className="text-[#103770] text-lg font-bold font-['Plus_Jakarta_Sans'] leading-[28.80px]">
                    {card.title}
                  </div>
                )}
                {card.description && (
                  <div className="text-[#103770] text-base font-normal font-['Plus_Jakarta_Sans'] leading-[25.60px]">
                    {card.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {item.buttonText && item.buttonUrl && (
          <Button as="link" href={item.buttonUrl} variant="secondary" rightIcon="arrow-right-alt">
            {item.buttonText}
          </Button>
        )}
      </div>
      {item.image && (
        <SanityImage
          image={item.image}
          className="w-[500px] h-[500px] object-cover"
          width={500}
          height={500}
        />
      )}
    </div>
  );
}
