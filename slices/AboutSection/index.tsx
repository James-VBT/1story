import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import { FadeIn } from "@/components/animations";

type AboutSectionProps = SliceComponentProps<Content.AboutSectionSlice>;

export default function AboutSection({ slice }: AboutSectionProps) {
  return (
    <section
      id="about"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-20 bg-white"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Column */}
          <FadeIn direction="left">
            <SectionHeading
              title={slice.primary.heading ?? "About Me"}
              alignment="left"
            />
            <div className="mt-6 space-y-4">
              <PrismicRichText
                field={slice.primary.body_text}
                components={{
                  paragraph: ({ children }) => (
                    <p className="text-gray-medium leading-relaxed">
                      {children}
                    </p>
                  ),
                }}
              />
            </div>
            {slice.primary.quote_text && (
              <blockquote className="mt-6 border-l-4 border-teal pl-4 italic text-gray-dark">
                &ldquo;{slice.primary.quote_text}&rdquo;
                {slice.primary.quote_author && (
                  <span className="block text-sm text-gray-medium mt-1 not-italic">
                    &mdash; {slice.primary.quote_author}
                  </span>
                )}
              </blockquote>
            )}
            <Button
              variant="outline"
              href={slice.primary.cta_link ?? "/book-now"}
              className="mt-8"
            >
              {slice.primary.cta_text ?? "Read More"}
            </Button>
          </FadeIn>

          {/* Portrait Image */}
          <FadeIn direction="right" delay={0.2}>
            <div className="aspect-square relative rounded-lg overflow-hidden">
              <PrismicNextImage
                field={slice.primary.portrait_image}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
