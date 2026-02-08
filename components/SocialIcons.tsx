import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

interface SocialIconsProps {
  className?: string;
}

const socials = [
  { icon: FaFacebookF, href: "#", label: "Facebook" },
  { icon: FaXTwitter, href: "#", label: "X" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaYoutube, href: "#", label: "YouTube" },
];

export default function SocialIcons({ className = "" }: SocialIconsProps) {
  return (
    <div className={`flex gap-4 ${className}`}>
      {socials.map(({ icon: Icon, href, label }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-teal hover:text-white transition-colors duration-200"
        >
          <Icon size={18} />
        </a>
      ))}
    </div>
  );
}
