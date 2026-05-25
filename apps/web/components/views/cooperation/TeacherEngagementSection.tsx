import { Button } from "@/components/ui/Button";
import { SanityImage } from "@/sanity/image/SanityImage";
import type { TeacherEngagementSection } from "@/sanity/typegen";

export default function TeacherEngagementSection({ item }: { item: TeacherEngagementSection }) {
  if (!item.cards?.length) return null;

  return (
    <div className="w-full bg-neutral-50">
      {/* Main content */}
      <div className="w-full px-20 py-14 flex flex-col items-center gap-12">
        {item.title && (
          <h2 className="text-center text-[#103770] text-[56px] font-bold font-['Fraunces'] leading-[59.36px] max-w-[900px]">
            {item.title}
          </h2>
        )}

        {/* Cards */}
        <div className="w-full max-w-[1280px] flex justify-center items-start gap-12">
          {item.cards.map((card, index) => (
            <div key={index} className="w-[360px] p-4 flex flex-col items-start gap-6">
              <div className="text-yellow-500 text-[56px] font-bold font-['Fraunces'] leading-[59.36px]">
                {String(index + 1).padStart(2, "0")}
              </div>
              {card.title && (
                <h3 className="text-[#103770] text-2xl font-bold font-['Plus_Jakarta_Sans'] leading-[31.20px]">
                  {card.title}
                </h3>
              )}
              {card.description && (
                <p className="text-[#103770] text-lg font-normal font-['Plus_Jakarta_Sans'] leading-[28.80px]">
                  {card.description}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Button */}
        {item.buttonText && item.buttonUrl && (
          <Button as="link" href={item.buttonUrl} variant="secondary" rightIcon="arrow-right-alt">
            {item.buttonText}
          </Button>
        )}
      </div>
      {item.bottomImage && (
        <SanityImage
          image={item.bottomImage}
          className="w-full h-auto object-cover"
          width={1920}
          height={400}
        />
      )}
    </div>
  );
}
