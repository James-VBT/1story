import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import HeroContent from "./HeroContent";
import YouTubeBackground from "./YouTubeBackground";

type HeroProps = SliceComponentProps<Content.HeroSlice>;

export default function Hero({ slice }: HeroProps) {
  const videoUrl = slice.primary.youtube_video_url;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative min-h-screen flex flex-col items-center justify-end overflow-hidden"
    >
      {/* Fallback poster image — always rendered behind the video */}
      <PrismicNextImage
        field={slice.primary.background_image}
        fill
        className="object-cover"
        priority
      />

      {/* YouTube video layer — renders on top of image when URL is set */}
      {videoUrl && <YouTubeBackground url={videoUrl} />}

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
