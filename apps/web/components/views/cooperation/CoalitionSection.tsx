import { Button } from "@/components/ui/Button";
import { SanityImage } from "@/sanity/image/SanityImage";

export default function CoalitionSection({ item }: { item: any }) {
  if (!item.cards?.length) return null;

  return (
    <section className="w-full p-6 md:px-20 py-12 md:py-16 2xl:py-20 bg-background md:bg-deep-navy-blue-50">
      <main className="max-w-480 mx-auto flex justify-start flex-col md:flex-row gap-16 2xl:gap-[5%] items-center">
        <article className="flex flex-col items-start gap-12 max-w-175">
          <header className="flex flex-col gap-6">
            {item.title && <h2 className="heading-2">{item.title}</h2>}
            <div className="flex flex-col gap-4">
              {item.subtitle && <p className="text-xl font-bold">{item.subtitle}</p>}
              {item.description && <p className="text-lg text-balance">{item.description}</p>}
            </div>
          </header>

          <div className="flex flex-col gap-6">
            <div className="flex gap-4 md:gap-8 flex-col md:flex-row">
              {item.cards.slice(0, 2).map((card: any, index: number) => (
                <div
                  key={index + 1}
                  className="w-full md:max-w-85 p-0 md:p-6 bg-background md:bg-gray-50 flex flex-col gap-2 md:gap-4"
                >
                  {card.title && (
                    <p className="text-xl font-bold leading-6 text-balance">{card.title}</p>
                  )}
                  {card.description && <p className="text-base text-balance">{card.description}</p>}
                </div>
              ))}
            </div>

            <div className="flex gap-4 md:gap-8 flex-col md:flex-row">
              {item.cards.slice(2, 4).map((card: any, index: number) => (
                <div
                  key={index + 2}
                  className="w-full md:max-w-85 p-0 md:p-6 bg-background md:bg-gray-50 flex flex-col gap-2 md:gap-4"
                >
                  {card.title && (
                    <p className="text-xl font-bold leading-6 text-balance">{card.title}</p>
                  )}
                  {card.description && <p className="text-base text-balance">{card.description}</p>}
                </div>
              ))}
            </div>
          </div>

          {item.buttonText && item.buttonUrl && (
            <Button
              as="link"
              href={item.buttonUrl}
              variant="secondary"
              size="large"
              className="min-h-15"
            >
              {item.buttonText}
            </Button>
          )}
        </article>

        {item.image && (
          <SanityImage
            image={item.image}
            className="size-80 md:size-150 object-cover"
            width={600}
            height={600}
          />
        )}
      </main>
    </section>
  );
}
