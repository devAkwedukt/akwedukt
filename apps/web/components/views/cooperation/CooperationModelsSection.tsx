import type { CooperationModelsSection } from "@/sanity/typegen";

export default function CooperationModelsSection({ item }: { item: CooperationModelsSection }) {
  if (!item.cards?.length) return null;

  return (
    <div className="w-full px-20 py-14 bg-neutral-50 flex flex-col items-center gap-12">
      <div className="w-full max-w-[1280px] flex flex-col items-center gap-12">
        {item.title && (
          <div className="w-full max-w-[900px] text-center text-[#103770] text-[56px] font-bold font-['Fraunces'] leading-[59.36px]">
            {item.title}
          </div>
        )}
        <div className="flex justify-center items-start gap-12">
          {item.cards.map((card, index) => (
            <div key={index} className="w-[360px] p-4 flex flex-col items-start gap-6">
              <div className="text-[#01a18e] text-[56px] font-bold font-['Fraunces'] leading-[59.36px]">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="flex flex-col items-start gap-4">
                {card.title && (
                  <div className="text-[#103770] text-2xl font-bold font-['Plus_Jakarta_Sans'] leading-[31.20px]">
                    {card.title}
                  </div>
                )}
                {card.description && (
                  <div className="text-[#103770] text-lg font-normal font-['Plus_Jakarta_Sans'] leading-[28.80px]">
                    {card.description}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
