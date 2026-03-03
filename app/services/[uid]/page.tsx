import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import * as prismic from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { HiChevronRight } from "react-icons/hi2";
import { createClient } from "@/prismicio";
import ServiceImageGallery from "@/components/ServiceImageGallery";
import { StaggerContainer, StaggerItem, FadeIn } from "@/components/animations";

type Props = { params: Promise<{ uid: string }> };

// Pre-generate a route for every service document at build time
export async function generateStaticParams() {
  const client = createClient();
  const services = await client.getAllByType("service");
  return services.map((service) => ({ uid: service.uid }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  const service = await client.getByUID("service", uid).catch(() => null);
  if (!service) return { title: "Service Not Found" };

  return {
    title: service.data.meta_title || service.data.title || "Service",
    description:
      service.data.meta_description || service.data.description || undefined,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { uid } = await params;
  const client = createClient();
  const service = await client.getByUID("service", uid).catch(() => null);
  if (!service) notFound();

  const { title, category, description, body, gallery, image } = service.data;

  // Build the gallery as ImageField[]; fall back to the card thumbnail if gallery is empty
  const galleryFields = (gallery ?? [])
    .map(({ image: img }) => img)
    .filter((img) => Boolean(img.url));

  const images = galleryFields.length > 0 ? galleryFields : image?.url ? [image] : [];

  return (
    <main className="pt-28 pb-20 bg-gray-light min-h-screen flex flex-col overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col flex-1">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-medium mb-8 uppercase tracking-wider overflow-hidden">
          <Link href="/" className="hover:text-teal transition-colors flex-shrink-0">Home</Link>
          <HiChevronRight size={12} className="flex-shrink-0" />
          <Link href="/book-now" className="hover:text-teal transition-colors flex-shrink-0">Services</Link>
          <HiChevronRight size={12} className="flex-shrink-0" />
          <span className="text-foreground font-semibold truncate flex-1 min-w-0">{title}</span>
        </nav>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-12 items-start">

          {/* Left — image gallery */}
          <FadeIn direction="up" delay={0.1}>
            <ServiceImageGallery images={images} />
          </FadeIn>

          {/* Right — content */}
          <StaggerContainer className="flex flex-col">

            {/* Category badge */}
            {category && (
              <StaggerItem>
                <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-teal mb-4">
                  {category}
                </span>
              </StaggerItem>
            )}

            {/* Title */}
            <StaggerItem>
              <h1 className="font-heading text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-foreground leading-tight mb-6">
                {title}
              </h1>
            </StaggerItem>

            {/* Divider */}
            <StaggerItem>
              <div className="w-12 h-0.5 bg-teal mb-6" />
            </StaggerItem>

            {/* Full rich-text description, or fall back to short description */}
            <StaggerItem>
              {prismic.isFilled.richText(body) ? (
                <PrismicRichText
                  field={body}
                  components={{
                    paragraph: ({ children }) => (
                      <p className="text-gray-medium text-sm leading-relaxed mb-4">
                        {children}
                      </p>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-semibold text-foreground">
                        {children}
                      </strong>
                    ),
                    em: ({ children }) => (
                      <em className="italic">{children}</em>
                    ),
                  }}
                />
              ) : description ? (
                <p className="text-gray-medium text-sm leading-relaxed mb-4">
                  {description}
                </p>
              ) : null}
            </StaggerItem>

          </StaggerContainer>
        </div>

      </div>
    </main>
  );
}
