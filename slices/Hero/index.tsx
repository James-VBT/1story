import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import HeroContent from "./HeroContent";

type HeroProps = SliceComponentProps<Content.HeroSlice>;

export default function Hero({ slice }: HeroProps) {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <PrismicNextImage
        field={slice.primary.background_image}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-navy/60" />

      <HeroContent
        eyebrowText={slice.primary.eyebrow_text}
        heading={slice.primary.heading}
        subtitle={slice.primary.subtitle}
        ctaText={slice.primary.cta_text}
        ctaLink={slice.primary.cta_link}
      />
    </section>
  );
}
