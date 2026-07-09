import type { CooperationModelsSection } from "@/sanity/typegen";

export default function CooperationModelsSection({ item }: { item: CooperationModelsSection }) {
  if (!item.cards?.length) return null;

  return (
    <section className="w-full px-6 md:px-20 py-12 md:py-16 2xl:py-20 bg-deep-navy-blue-50 flex flex-col items-center gap-12">
      <main className="max-w-480 mx-auto w-full flex flex-col items-center gap-12">
        {item.title && <h2 className="w-full text-left md:text-center heading-2">{item.title}</h2>}
        <div className="flex justify-between flex-col md:flex-row items-start gap-8 2xl:gap-12">
          {item.cards.map((card, index) => (
            /* Single card */
            <div
              key={index}
              className="flex flex-col gap-6 items-stretch self-stretch w-full md:w-1/3 2xl:w-3/10 bg-gray-50 p-4 md:p-6"
            >
              <h2 className="heading-2 text-ocean-green-700">
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
      </main>
    </section>
  );
}
