"use client";

import { useState } from "react";

function extractVideoId(url: string): string | null {
  // Handles:
  //   youtube.com/watch?v=ID
  //   youtu.be/ID
  //   youtube.com/embed/ID
  //   youtube.com/shorts/ID
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

  // YouTube embed params:
  //   autoplay=1    - auto-start
  //   mute=1        - required for autoplay in browsers
  //   loop=1        - continuous loop
  //   playlist=ID   - required for loop to work on single video
  //   controls=0    - hide player controls
  //   showinfo=0    - hide video title
  //   modestbranding=1 - minimal YouTube branding
  //   rel=0         - no related videos
  //   playsinline=1 - inline playback on iOS
  const embedSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&modestbranding=1&rel=0&playsinline=1&enablejsapi=1`;

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <iframe
        src={embedSrc}
        title="Background video"
        allow="autoplay; encrypted-media"
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[max(100%,177.78vh)] h-[max(100%,56.25vw)] border-0 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}
