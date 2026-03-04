"use client";

import { useState, useEffect } from "react";
import { HiPlay, HiXMark } from "react-icons/hi2";

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

type Mode = "pending" | "desktop" | "mobile-idle" | "mobile-playing";

export default function YouTubeBackground({ url }: YouTubeBackgroundProps) {
  const [mode, setMode] = useState<Mode>("pending");
  const [bgLoaded, setBgLoaded] = useState(false);
  const videoId = extractVideoId(url);

  useEffect(() => {
    // Decide after hydration so SSR is clean
    setMode(window.innerWidth >= 768 ? "desktop" : "mobile-idle");
  }, []);

  // Lock body scroll when modal is open on mobile
  useEffect(() => {
    if (mode === "mobile-playing") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mode]);

  if (!videoId || mode === "pending") return null;

  // ─── Desktop: full-screen muted autoplay background ───────────────────────
  if (mode === "desktop") {
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
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[max(100%,177.78vh)] h-[max(100%,56.25vw)] border-0 transition-opacity duration-700 ${bgLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setBgLoaded(true)}
        />
      </div>
    );
  }

  // ─── Mobile idle: play button over the poster image ───────────────────────
  if (mode === "mobile-idle") {
    return (
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <button
          onClick={() => setMode("mobile-playing")}
          aria-label="Play video"
          className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/60 flex items-center justify-center hover:bg-white/30 transition-colors"
        >
          <HiPlay className="text-white ml-1" size={28} />
        </button>
      </div>
    );
  }

  // ─── Mobile playing: fullscreen modal player ──────────────────────────────
  const embedSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={() => setMode("mobile-idle")}
    >
      <button
        onClick={() => setMode("mobile-idle")}
        aria-label="Close video"
        className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors"
      >
        <HiXMark size={28} />
      </button>
      <div
        className="w-full max-w-[95vw] aspect-video"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src={embedSrc}
          title="Service video"
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
          className="w-full h-full border-0"
        />
      </div>
    </div>
  );
}
