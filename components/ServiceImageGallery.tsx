"use client";

import { useState, useEffect, useCallback } from "react";
import type { ImageField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import Image from "next/image";
import { HiChevronLeft, HiChevronRight, HiXMark, HiPlay } from "react-icons/hi2";

export interface GalleryMediaItem {
  image: ImageField;
  video_url: string | null | undefined;
}

interface ServiceImageGalleryProps {
  items: GalleryMediaItem[];
}

/** Convert a YouTube or Vimeo URL to its embed URL, or return null. */
function getEmbedUrl(url: string): string | null {
  // YouTube: youtube.com/watch?v=ID  youtu.be/ID  youtube.com/embed/ID  youtube.com/shorts/ID
  const yt = url.match(
    /(?:youtube\.com\/watch\?.*v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/
  );
  if (yt) {
    return `https://www.youtube.com/embed/${yt[1]}?rel=0&modestbranding=1`;
  }

  // Vimeo: vimeo.com/ID  player.vimeo.com/video/ID
  const vimeo = url.match(/(?:vimeo\.com\/(?:video\/)?)(\d+)/);
  if (vimeo) {
    return `https://player.vimeo.com/video/${vimeo[1]}`;
  }

  return null;
}

export default function ServiceImageGallery({ items }: ServiceImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  function prev() {
    setActiveIndex((i) => (i === 0 ? items.length - 1 : i - 1));
  }

  function next() {
    setActiveIndex((i) => (i === items.length - 1 ? 0 : i + 1));
  }

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  // Close lightbox if navigation lands on a video item
  useEffect(() => {
    const item = items[activeIndex];
    if (lightboxOpen && item?.video_url && getEmbedUrl(item.video_url)) {
      setLightboxOpen(false);
    }
  }, [activeIndex, lightboxOpen, items]);

  // Keyboard nav for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") setActiveIndex((i) => (i === 0 ? items.length - 1 : i - 1));
      if (e.key === "ArrowRight") setActiveIndex((i) => (i === items.length - 1 ? 0 : i + 1));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, items.length, closeLightbox]);

  if (!items.length) return null;

  const activeItem = items[activeIndex];
  const activeEmbedUrl = activeItem.video_url ? getEmbedUrl(activeItem.video_url) : null;
  const isVideo = Boolean(activeEmbedUrl);

  return (
    <>
      <div className="flex flex-col gap-3">
        {/* Main display — iframe for video, image for everything else */}
        <div
          className={`relative aspect-[16/10] sm:aspect-[4/3] overflow-hidden rounded-lg bg-gray-900 shadow-xl touch-pan-y ${!isVideo ? "cursor-zoom-in" : ""}`}
          onClick={!isVideo ? () => setLightboxOpen(true) : undefined}
        >
          {isVideo ? (
            <iframe
              key={activeIndex}
              src={activeEmbedUrl!}
              title="Service video"
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          ) : (
            <PrismicNextImage
              key={activeIndex}
              field={activeItem.image}
              fill
              className="object-cover transition-opacity duration-300"
              sizes="(max-width: 768px) 100vw, 55vw"
            />
          )}
        </div>

        {/* Thumbnail strip */}
        <div className="flex items-center justify-center gap-2 w-full">
          {/* Prev arrow */}
          <button
            onClick={prev}
            aria-label="Previous"
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 bg-white hover:border-teal hover:text-teal transition-colors duration-200"
          >
            <HiChevronLeft size={18} />
          </button>

          {/* Thumbnails */}
          <div className="flex-1 min-w-0 overflow-x-auto overscroll-x-contain flex gap-2 justify-center scrollbar-hide">
            {items.map((item, i) => {
              const embedUrl = item.video_url ? getEmbedUrl(item.video_url) : null;
              const isItemVideo = Boolean(embedUrl);
              return (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`View ${isItemVideo ? "video" : "image"} ${i + 1}`}
                  className={`relative flex-shrink-0 w-9 h-9 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded overflow-hidden border-2 transition-all duration-200 bg-gray-200 ${
                    i === activeIndex
                      ? "border-teal"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  {item.image?.url ? (
                    <PrismicNextImage
                      field={item.image}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  ) : null}
                  {/* Play overlay for video thumbnails */}
                  {isItemVideo && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <HiPlay className="text-white drop-shadow" size={14} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Next arrow */}
          <button
            onClick={next}
            aria-label="Next"
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 bg-white hover:border-teal hover:text-teal transition-colors duration-200"
          >
            <HiChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Lightbox — images only; videos play inline */}
      {lightboxOpen && !isVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            aria-label="Close"
            className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors"
          >
            <HiXMark size={28} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous image"
            className="absolute left-4 z-10 text-white/70 hover:text-white transition-colors p-2"
          >
            <HiChevronLeft size={36} />
          </button>

          <div
            className="relative w-[90vw] max-w-5xl aspect-[4/3]"
            onClick={(e) => e.stopPropagation()}
          >
            {activeItem.image?.url ? (
              <Image
                src={activeItem.image.url}
                alt={activeItem.image.alt ?? ""}
                fill
                className="object-contain"
                sizes="90vw"
              />
            ) : null}
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next image"
            className="absolute right-4 z-10 text-white/70 hover:text-white transition-colors p-2"
          >
            <HiChevronRight size={36} />
          </button>

          <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/50 text-sm">
            {activeIndex + 1} / {items.length}
          </span>
        </div>
      )}
    </>
  );
}
