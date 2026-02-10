import { HiOutlineEnvelope, HiOutlinePhone, HiOutlineMapPin } from "react-icons/hi2";
import SocialIcons from "./SocialIcons";
import ContactForm from "./ContactForm";
import { FadeIn } from "./animations";

interface FooterProps {
  contact: {
    address: string;
    phone: string;
    fax: string;
    email: string;
  };
  socialLinks: { platform: string; url: string }[];
  siteTitle: string;
  siteTagline: string;
}

export default function Footer({ contact, socialLinks, siteTitle, siteTagline }: FooterProps) {
  return (
    <footer id="contact" className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <FadeIn direction="left">
            <h2 className="font-heading uppercase tracking-[0.15em] text-2xl font-extrabold mb-2">
              {siteTitle}
            </h2>
            <p className="text-white/60 text-sm mb-8">{siteTagline}</p>

            <div className="space-y-4 text-white/80 text-sm">
              <div className="flex items-start gap-3">
                <HiOutlineMapPin className="mt-0.5 flex-shrink-0" size={18} />
                <span>{contact.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <HiOutlinePhone className="flex-shrink-0" size={18} />
                <span>Tel: {contact.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <HiOutlinePhone className="flex-shrink-0" size={18} />
                <span>Fax: {contact.fax}</span>
              </div>
              <div className="flex items-center gap-3">
                <HiOutlineEnvelope className="flex-shrink-0" size={18} />
                <span>{contact.email}</span>
              </div>
            </div>

            <SocialIcons links={socialLinks} className="mt-8" />
          </FadeIn>

          {/* Contact Form */}
          <FadeIn direction="right" delay={0.2}>
            <h3 className="font-heading uppercase tracking-wider text-lg font-bold mb-6">
              Send a Message
            </h3>
            <ContactForm />
          </FadeIn>
        </div>

        <FadeIn>
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/40 text-sm">
            &copy; {new Date().getFullYear()} {siteTitle}. All rights reserved.
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}
