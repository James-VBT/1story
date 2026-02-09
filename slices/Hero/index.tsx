import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import Button from "@/components/Button";

type HeroProps = SliceComponentProps<Content.HeroSlice>;

export default function Hero({ slice }: HeroProps) {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <PrismicNextImage
        field={slice.primary.background_image}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-navy/60" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <p className="font-heading uppercase tracking-[0.3em] text-sm md:text-base font-semibold text-white/80 mb-6">
          {slice.primary.eyebrow_text}
        </p>
        <h1 className="font-heading uppercase tracking-[0.15em] text-6xl md:text-8xl font-extrabold mb-6">
          {slice.primary.heading}
        </h1>
        <p className="text-lg md:text-xl text-white/80 mb-10 max-w-xl mx-auto">
          {slice.primary.subtitle}
        </p>
        <Button
          variant="primary"
          href={slice.primary.cta_link ?? "/book-now"}
        >
          {slice.primary.cta_text ?? "Book Now"}
        </Button>
      </div>
    </section>
  );
}
