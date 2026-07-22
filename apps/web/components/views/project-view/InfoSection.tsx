import type { InfoSection } from "@/sanity/typegen";

export default function InfoSection({ item }: { item: InfoSection }) {
  if (!item.cards?.length) return null;

  return (
    <section className="w-full px-6 md:px-20 py-12 md:py-16 2xl:py-20 bg-background md:bg-deep-navy-blue-50">
      <main className="mx-auto flex flex-col md:flex-row justify-start gap-12 md:gap-16 2xl:gap-[5%]  items-center">
        <article className="flex flex-col gap-8 md:gap-12">
          <header className="flex flex-col gap-6">
            {item.title && <h2 className="heading-2">{item.title}</h2>}
            <div className="flex flex-col gap-0">
              {item.description && <p className="text-base md:text-lg">{item.description}</p>}
            </div>
          </header>
          <main className="flex flex-col gap-4 md:gap-6">
            <div className="flex gap-4 md:gap-8 flex-col md:flex-row md:flex-wrap">
              {item.cards.map((card: any, index: number) => (
                <div
                  key={index}
                  className="w-full md:w-auto max-w-125 2xl:w-auto p-0 md:p-6 bg-background md:bg-gray-50 flex flex-col gap-2 md:gap-4"
                >
                  {card.title && (
                    <p className="text-lg md:text-xl font-bold leading-6 text-balance">
                      {card.title}
                    </p>
                  )}
                  {card.description && <p className="text-base text-balance">{card.description}</p>}
                </div>
              ))}
            </div>
          </main>
        </article>
      </main>
    </section>
  );
}
