import { Button } from "@/components/ui/Button";
import { SanityImage } from "@/sanity/image/SanityImage";
import type { TeacherEngagementSection } from "@/sanity/typegen";

export default function TeacherEngagementSection({ item }: { item: TeacherEngagementSection }) {
  if (!item.cards?.length) return null;

  return (
    <section className="max-w-480 w-full bg-gray-50">
      {/* Main content */}
      <main className="px-20 py-16 2xl:py-20 flex flex-col items-center gap-14">
        {item.title && <h2 className="max-w-225 heading-2 text-center">{item.title}</h2>}

        {/* Cards */}
        <div className="w-full flex justify-between items-start gap-6 2xl:gap-12">
          {item.cards.map((card, index) => (
            /* Single card */
            <div key={index} className="w-1/3 2xl:w-3/10 p-6 flex flex-col items-start gap-6">
              <h2 className="heading-2 text-yellow-500">{String(index + 1).padStart(2, "0")}</h2>
              {card.title && <h3 className="heading-3 text-balance">{card.title}</h3>}
              {card.description && <p className="text-lg text-balance">{card.description}</p>}
            </div>
          ))}
        </div>

        {/* Button */}
        {item.buttonText && item.buttonUrl && (
          <Button as="link" href={item.buttonUrl} variant="secondary" rightIcon="arrow-right-alt">
            {item.buttonText}
          </Button>
        )}
      </main>

      {item.bottomImage && (
        <SanityImage
          image={item.bottomImage}
          className="w-full h-auto object-cover"
          width={1440}
          height={240}
        />
      )}
    </section>
  );
}
