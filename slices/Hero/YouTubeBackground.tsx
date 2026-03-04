"use client";

import { useState, useEffect } from "react";
import { HiPlay, HiXMark } from "react-icons/hi2";

type VideoInfo = { type: "youtube" | "vimeo"; id: string };

function extractVideo(url: string): VideoInfo | null {
  const yt = url.match(
    /(?:youtube\.com\/watch\?.*v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/
  );
  if (yt) return { type: "youtube", id: yt[1] };

  const vimeo = url.match(/(?:vimeo\.com\/(?:video\/)?)(\d+)/);
  if (vimeo) return { type: "vimeo", id: vimeo[1] };

  return null;
}

async function getThumbnailUrl(video: VideoInfo): Promise<string | null> {
  if (video.type === "youtube") {
    // hqdefault (480×360) is always available for every YouTube video
    return `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
  }
  // Vimeo: fetch via oEmbed
  try {
    const res = await fetch(
      `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${video.id}`
    );
    const data = await res.json();
    return data.thumbnail_url ?? null;
  } catch {
    return null;
  }
}

interface YouTubeBackgroundProps {
  url: string;
}

type Mode = "pending" | "desktop" | "mobile-idle" | "mobile-playing";

export default function YouTubeBackground({ url }: YouTubeBackgroundProps) {
  const [mode, setMode] = useState<Mode>("pending");
  const [bgLoaded, setBgLoaded] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);

  const video = extractVideo(url);

  useEffect(() => {
    if (!video) return;
    if (window.innerWidth >= 768) {
      setMode("desktop");
    } else {
      setMode("mobile-idle");
      // Fetch video thumbnail for the mobile preview
      getThumbnailUrl(video).then((t) => setThumbnailUrl(t));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (mode === "mobile-playing") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mode]);

  if (!video || mode === "pending") return null;

  // ─── Desktop: full-screen muted autoplay background ───────────────────────
  if (mode === "desktop") {
    const embedSrc = `https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&loop=1&playlist=${video.id}&controls=0&showinfo=0&modestbranding=1&rel=0&playsinline=1&enablejsapi=1`;
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
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

  // ─── Mobile idle: video thumbnail + play button ────────────────────────────
  if (mode === "mobile-idle") {
    return (
      <div className="absolute inset-0 z-10">
        {/* Video thumbnail covers the Prismic poster when loaded */}
        {thumbnailUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumbnailUrl}
            alt="Video preview"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        {/* Play button centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={() => setMode("mobile-playing")}
            aria-label="Play video"
            className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/60 flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <HiPlay className="text-white ml-1" size={28} />
          </button>
        </div>
      </div>
    );
  }

  // ─── Mobile playing: fullscreen modal player ──────────────────────────────
  const embedSrc =
    video.type === "youtube"
      ? `https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`
      : `https://player.vimeo.com/video/${video.id}?autoplay=1`;

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
          title="Video"
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
          className="w-full h-full border-0"
        />
      </div>
    </div>
  );
}
