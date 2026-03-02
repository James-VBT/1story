"use client";

import { useState, useEffect, useCallback } from "react";
import type { ImageField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import Image from "next/image";
import { HiChevronLeft, HiChevronRight, HiXMark } from "react-icons/hi2";

interface ServiceImageGalleryProps {
  images: ImageField[];
}

export default function ServiceImageGallery({ images }: ServiceImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  function prev() {
    setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  }

  function next() {
    setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  }

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  // Close lightbox on Escape key
  useEffect(() => {
    if (!lightboxOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1));
      if (e.key === "ArrowRight") setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, images.length, closeLightbox]);

  if (!images.length) return null;

  const activeImage = images[activeIndex];

  return (
    <>
      <div className="flex flex-col gap-3">
        {/* Main image — click to open lightbox */}
        <div
          className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100 cursor-zoom-in"
          onClick={() => setLightboxOpen(true)}
        >
          <PrismicNextImage
            key={activeIndex}
            field={activeImage}
            fill
            className="object-cover transition-opacity duration-300"
            sizes="(max-width: 768px) 100vw, 55vw"
          />
        </div>

        {/* Thumbnail strip */}
        <div className="flex items-center justify-center gap-2 w-full">
          {/* Prev arrow */}
          <button
            onClick={prev}
            aria-label="Previous image"
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 bg-white hover:border-teal hover:text-teal transition-colors duration-200"
          >
            <HiChevronLeft size={18} />
          </button>

          {/* Thumbnails — scrollable on mobile, centered on sm+ */}
          <div className="flex-1 min-w-0 max-w-[200px] sm:max-w-none overflow-x-auto flex gap-2 sm:justify-center lg:justify-center scrollbar-hide">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`View image ${i + 1}`}
                className={`relative flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded overflow-hidden border-2 transition-all duration-200 ${
                  i === activeIndex
                    ? "border-teal"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                <PrismicNextImage
                  field={img}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </button>
            ))}
          </div>

          {/* Next arrow */}
          <button
            onClick={next}
            aria-label="Next image"
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 bg-white hover:border-teal hover:text-teal transition-colors duration-200"
          >
            <HiChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            aria-label="Close"
            className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors"
          >
            <HiXMark size={28} />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous image"
            className="absolute left-4 z-10 text-white/70 hover:text-white transition-colors p-2"
          >
            <HiChevronLeft size={36} />
          </button>

          {/* Lightbox image — use raw URL for full-res display */}
          <div
            className="relative w-[90vw] max-w-5xl aspect-[4/3]"
            onClick={(e) => e.stopPropagation()}
          >
            {activeImage.url ? (
              <Image
                src={activeImage.url}
                alt={activeImage.alt ?? ""}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            ) : null}
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next image"
            className="absolute right-4 z-10 text-white/70 hover:text-white transition-colors p-2"
          >
            <HiChevronRight size={36} />
          </button>

          {/* Counter */}
          <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/50 text-sm">
            {activeIndex + 1} / {images.length}
          </span>
        </div>
      )}
    </>
  );
}
