import type { CooperationModelsSection } from "@/sanity/typegen";

export default function CooperationModelsSection({ item }: { item: CooperationModelsSection }) {
  if (!item.cards?.length) return null;

  return (
    <section className="max-w-480 w-full px-20 py-20 bg-deep-navy-blue-50 flex flex-col items-center gap-12">
      <div className="w-full flex flex-col items-center gap-12">
        {item.title && <h2 className="w-full text-center heading-2">{item.title}</h2>}
        <div className="flex justify-between items-start gap-12">
          {item.cards.map((card, index) => (
            /* Single card */
            <div
              key={index}
              className="flex flex-col gap-6 items-stretch self-stretch w-3/10 bg-gray-50 p-6 "
            >
              <h2 className="heading-2 text-ocean-green-500">
                {String(index + 1).padStart(2, "0")}
              </h2>
              <div className="flex flex-col items-start gap-4">
                {card.title && <h3 className="heading-3 text-balance">{card.title}</h3>}
                {card.description && (
                  <p className="text-lg font-normal text-balance">{card.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
