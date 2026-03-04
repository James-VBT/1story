"use client";

import { useState } from "react";

function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?.*v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

interface YouTubeBackgroundProps {
  url: string;
}

export default function YouTubeBackground({ url }: YouTubeBackgroundProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoId = extractVideoId(url);

  if (!videoId) return null;

  const embedSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&modestbranding=1&rel=0&playsinline=1&enablejsapi=1`;

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/*
        aspect-video + min-w-full + min-h-full = CSS "object-cover" for iframes:
        the browser picks the smallest 16:9 size that fills both dimensions,
        extending beyond the container edge when the aspect ratios don't match.
        Works on all screen sizes — portrait mobile, landscape tablet, ultrawide desktop.
      */}
      <iframe
        src={embedSrc}
        title="Background video"
        allow="autoplay; encrypted-media"
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-video min-w-full min-h-full border-0 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}
