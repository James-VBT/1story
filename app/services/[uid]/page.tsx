import type { Metadata } from "next";
import Link from "next/link";
import { HiChevronRight } from "react-icons/hi2";
import ServiceImageGallery from "@/components/ServiceImageGallery";
import { StaggerContainer, StaggerItem, FadeIn } from "@/components/animations";

// ─── Static placeholder data (will be replaced with Prismic) ─────────────────

const STATIC_SERVICE = {
  title: "Health & Wellness Coaching",
  category: "Personal Growth",
  description: [
    "Our Health & Wellness Coaching programme is designed to help you build sustainable habits that transform your daily life. Working one-on-one with your coach, you will identify the root causes of what is holding you back and create a personalised roadmap towards optimal wellbeing.",
    "Each session focuses on real, actionable steps — whether that means improving your nutrition, establishing a consistent movement practice, managing stress, or rebuilding your energy from the ground up. Progress is tracked, celebrated, and continuously refined.",
    "This service is suitable for anyone feeling stuck, overwhelmed, or simply ready to invest in themselves. No experience is necessary — only the commitment to show up and do the work.",
  ],
  images: [
    { src: "/images/services/health-wellness.jpg",     alt: "Health & Wellness Coaching" },
    { src: "/images/services/personal-life.jpg",       alt: "Personal Life Coaching" },
    { src: "/images/services/career-executive.jpg",    alt: "Career Executive Coaching" },
    { src: "/images/services/intro-consultation.jpg",  alt: "Intro Consultation" },
    { src: "/images/services/master-finances.jpg",     alt: "Master Your Finances" },
    { src: "/images/services/career-individual.jpg",   alt: "Career Individual Coaching" },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: STATIC_SERVICE.title,
  description: STATIC_SERVICE.description[0],
};

export default function ServiceDetailPage() {
  const { title, category, description, images } = STATIC_SERVICE;

  return (
    <main className="pt-28 pb-8 bg-white min-h-screen flex flex-col overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col flex-1">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-medium mb-6 uppercase tracking-wider lg:tracking-widest overflow-hidden">
          <Link href="/" className="hover:text-teal transition-colors flex-shrink-0">Home</Link>
          <HiChevronRight size={12} className="flex-shrink-0" />
          <Link href="/book-now" className="hover:text-teal transition-colors flex-shrink-0">Services</Link>
          <HiChevronRight size={12} className="flex-shrink-0" />
          <span className="text-foreground font-semibold truncate flex-1 min-w-0">{title}</span>
        </nav>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-[55%_1fr] gap-8 lg:gap-16 items-start lg:flex-1">

          {/* Left — image gallery */}
          <FadeIn direction="up" delay={0.1} className="lg:h-full">
            <ServiceImageGallery images={images} />
          </FadeIn>

          {/* Right — content */}
          <StaggerContainer className="flex flex-col">
            {/* Category badge */}
            <StaggerItem>
              <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-teal mb-4">
                {category}
              </span>
            </StaggerItem>

            {/* Title */}
            <StaggerItem>
              <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight sm:tracking-[0.05em] md:tracking-[0.1em] text-foreground leading-tight mb-6">
                {title}
              </h1>
            </StaggerItem>

            {/* Divider */}
            <StaggerItem>
              <div className="w-12 h-0.5 bg-teal mb-6" />
            </StaggerItem>

            {/* Description paragraphs */}
            {description.map((para, i) => (
              <StaggerItem key={i}>
                <p className="text-gray-medium text-sm leading-relaxed mb-4">
                  {para}
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

      </div>
    </main>
  );
}
