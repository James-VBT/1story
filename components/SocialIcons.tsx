import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import type { IconType } from "react-icons";

interface SocialIconsProps {
  links: { platform: string; url: string }[];
  className?: string;
}

const platformIcons: Record<string, IconType> = {
  Facebook: FaFacebookF,
  X: FaXTwitter,
  Instagram: FaInstagram,
  YouTube: FaYoutube,
};

export default function SocialIcons({ links, className = "" }: SocialIconsProps) {
  return (
    <div className={`flex gap-4 ${className}`}>
      {links.map(({ platform, url }) => {
        const Icon = platformIcons[platform];
        if (!Icon) return null;
        return (
          <a
            key={platform}
            href={url}
            aria-label={platform}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-teal hover:text-white transition-colors duration-200"
          >
            <Icon size={18} />
          </a>
        );
      })}
    </div>
  );
}
