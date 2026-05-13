import { IconButton } from "@/components/ui/IconButton";
import type { ProjectVideoSection } from "@/sanity/typegen";

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
    twitter: "mail", // Fallback to mail icon for twitter since it's not in sprite
    youtube: "mail", // Fallback to mail icon for youtube since it's not in sprite
    tiktok: "mail", // Fallback to mail icon for tiktok since it's not in sprite
    other: "mail", // Fallback to mail icon for other platforms
  };
  return iconMap[platform.toLowerCase()] || "mail";
}

export default function ProjectVideoSection({ item }: ProjectVideoSectionProps) {
  if (!item.video?.url || !item.title) {
    return null;
  }

  const embedUrl = getEmbedUrl(item.video.url);
  const socialLinks = item.socialLinks || [];

  return (
    <div className="container py-12">
      <div className="text-center mb-8">
        <h2 className="text-[#103770] text-3xl font-bold font-['Plus_Jakarta_Sans'] mb-4">
          {item.title}
        </h2>
        {item.subtitle && (
          <p className="text-[#103770] text-lg font-normal font-['Plus_Jakarta_Sans'] leading-relaxed max-w-3xl mx-auto">
            {item.subtitle}
          </p>
        )}
        {socialLinks.length > 0 && (
          <div className="text-center">
            <div className="flex flex-wrap justify-center gap-4">
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
          </div>
        )}
      </div>

      <div className="max-w-4xl mx-auto mb-8">
        <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-lg">
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
              <p className="text-gray-600">Nie można załadować wideo</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
