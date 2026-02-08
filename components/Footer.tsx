import { HiOutlineEnvelope, HiOutlinePhone, HiOutlineMapPin } from "react-icons/hi2";
import { contactInfo } from "@/lib/data";
import SocialIcons from "./SocialIcons";
import ContactForm from "./ContactForm";

export default function Footer() {
  return (
    <footer id="contact" className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="font-heading uppercase tracking-[0.15em] text-2xl font-extrabold mb-2">
              Allan Johnson
            </h2>
            <p className="text-white/60 text-sm mb-8">Personal Life Coach</p>

            <div className="space-y-4 text-white/80 text-sm">
              <div className="flex items-start gap-3">
                <HiOutlineMapPin className="mt-0.5 flex-shrink-0" size={18} />
                <span>{contactInfo.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <HiOutlinePhone className="flex-shrink-0" size={18} />
                <span>Tel: {contactInfo.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <HiOutlinePhone className="flex-shrink-0" size={18} />
                <span>Fax: {contactInfo.fax}</span>
              </div>
              <div className="flex items-center gap-3">
                <HiOutlineEnvelope className="flex-shrink-0" size={18} />
                <span>{contactInfo.email}</span>
              </div>
            </div>

            <SocialIcons className="mt-8" />
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="font-heading uppercase tracking-wider text-lg font-bold mb-6">
              Send a Message
            </h3>
            <ContactForm />
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/40 text-sm">
          &copy; {new Date().getFullYear()} Allan Johnson. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
