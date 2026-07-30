import { IconButton } from "@/components/ui/IconButton";
import type { ProjectVideoSection } from "@/sanity/typegen";
import { cn } from "@/lib/utils";
import { SanityRichText } from "@/sanity/richText/SanityRichText";

interface ProjectVideoSectionProps {
  item: ProjectVideoSection;
}

function getYouTubeEmbedUrl(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? `https://www.youtube.com/embed/${match[2]}` : null;
}

function getVimeoEmbedUrl(url: string): string | null {
  const regExp = /^.*(vimeo\.com\/)(\d+).*$/;
  const match = url.match(regExp);
  return match ? `https://player.vimeo.com/video/${match[2]}` : null;
}

function getEmbedUrl(url: string): string | null {
  return getYouTubeEmbedUrl(url) || getVimeoEmbedUrl(url) || url;
}

function getSocialIcon(platform: string): string {
  const iconMap: Record<string, string> = {
    facebook: "facebook",
    instagram: "instagram",
    linkedin: "linkedin",
    tiktok: "tiktok",
  };
  return iconMap[platform.toLowerCase()] || "mail";
}

export default function ProjectVideoSection({ item }: ProjectVideoSectionProps) {
  if (!item.video?.url || !item.title || item.enabled === false) {
    return null;
  }

  const embedUrl = getEmbedUrl(item.video.url);
  const socialLinks = item.socialLinks || [];

  return (
    <div className="max-w-480 mx-auto w-full flex flex-col items-center py-8 md:py-14 2xl:py-20 px-6 md:px-20 md:flex-row gap-16 3xl:px-0">
      <aside className={cn(item.videoPosition === "right" ? "md:order-1" : "md:order-2")}>
        <h2 className="heading-2 mb-4">{item.title}</h2>
        {item.subtitle && <SanityRichText value={item.subtitle} />}
        {socialLinks.length > 0 && (
          <div className="flex flex-wrap gap-4">
            {socialLinks
              .filter((link) => link.url)
              .map((link, index) => (
                <IconButton
                  key={index}
                  as="link"
                  href={link.url!}
                  target="_blank"
                  icon={getSocialIcon(link.platform || "other")}
                  size="large"
                  shape="square"
                  aria-label={link.label || link.platform}
                />
              ))}
          </div>
        )}
      </aside>

      <main
        className={cn(
          "w-full relative aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-lg",
          item.videoPosition === "right" ? "md:order-2" : "md:order-1"
        )}
      >
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title={item.video.title || "Video"}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-deep-navy-blue-700">Nie można załadować wideo</p>
          </div>
        )}
      </main>
    </div>
  );
}
