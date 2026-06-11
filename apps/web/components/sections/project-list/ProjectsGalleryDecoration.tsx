import React from "react";
import { SanityImage } from "@/sanity/image/SanityImage";
import type { ProjectsGallerySection } from "@/sanity/typegen";

interface ProjectsGalleryDecorationProps {
  variant?: ProjectsGallerySection["decorationVariant"];
  decorationImages?: ProjectsGallerySection["decorationImages"];
  position?: "inside" | "outside";
}

export default function ProjectsGalleryDecoration({
  variant,
  decorationImages,
}: ProjectsGalleryDecorationProps) {
  if (!variant) return null;

  const decorations: Record<string, React.ReactNode[]> = {
    "what-we-do-international": [
      decorationImages?.whatWeDoInternational?.desktop ? (
        <SanityImage
          key="desktop"
          image={decorationImages.whatWeDoInternational.desktop}
          alt="Dekoracja - projekty"
          className="absolute -top-10 right-1/4 hidden md:block"
          width={72}
          height={76}
        />
      ) : null,
      decorationImages?.whatWeDoInternational?.desktop2 ? (
        <SanityImage
          key="desktop-2"
          image={decorationImages.whatWeDoInternational.desktop2}
          alt="Dekoracja - projekty"
          className="absolute top-15 right-1/12 hidden md:block"
          width={201}
          height={106}
        />
      ) : null,
      decorationImages?.whatWeDoInternational?.mobile ? (
        <SanityImage
          key="mobile"
          image={decorationImages.whatWeDoInternational.mobile}
          alt="Dekoracja - projekty"
          className="absolute top-0 right-0 block md:hidden"
          width={63}
          height={61}
        />
      ) : null,
      decorationImages?.whatWeDoInternational?.mobile2 ? (
        <SanityImage
          key="mobile-2"
          image={decorationImages.whatWeDoInternational.mobile2}
          alt="Dekoracja - projekty"
          className="absolute top-20 right-0 block md:hidden"
          width={63}
          height={40}
        />
      ) : null,
    ],

    "what-we-do-polish": [
      decorationImages?.whatWeDoPolish?.desktop ? (
        <SanityImage
          key="desktop"
          image={decorationImages.whatWeDoPolish.desktop}
          alt="Dekoracja - polskie projekty"
          className="absolute -top-1/6 left-0 hidden md:block"
          width={141}
          height={447}
        />
      ) : null,
      decorationImages?.whatWeDoPolish?.mobile ? (
        <SanityImage
          key="mobile"
          image={decorationImages.whatWeDoPolish.mobile}
          alt="Dekoracja - polskie projekty"
          className="absolute top-0 right-0 block md:hidden"
          width={99}
          height={285}
        />
      ) : null,
    ],

    "cooperation-international-en": [
      decorationImages?.cooperationInternationalEn?.desktop ? (
        <SanityImage
          key="desktop"
          image={decorationImages.cooperationInternationalEn.desktop}
          alt="Dekoracja - projekty"
          className="absolute -top-8 right-1/24 w-53.5 h-37.75 md:w-91 md:h-51.5"
        />
      ) : null,
    ],

    "parents-current": [
      decorationImages?.parentsCurrent?.desktop ? (
        <SanityImage
          key="desktop"
          image={decorationImages.parentsCurrent.desktop}
          alt="Dekoracja - projekty"
          className="absolute -top-7.5 right-1/12 w-14.5 h-17 md:w-23 md:h-26.75"
        />
      ) : null,
    ],

    "what-new-current": [
      decorationImages?.whatNewCurrent?.desktop && decorationImages?.whatNewCurrent?.mobile ? (
        <React.Fragment key="what-new-current">
          <SanityImage
            key="desktop"
            image={decorationImages.whatNewCurrent.desktop}
            alt="Dekoracja - aktualne projekty"
            className="w-full h-auto object-cover hidden md:block"
            width={1440}
            height={240}
          />
          <SanityImage
            key="mobile"
            image={decorationImages.whatNewCurrent.mobile}
            alt="Dekoracja - aktualne projekty"
            className="w-full h-auto object-cover block md:hidden"
            width={1440}
            height={240}
          />
        </React.Fragment>
      ) : null,
    ],
  };

  return decorations[variant]?.filter(Boolean) || null;
}
