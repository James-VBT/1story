"use client";

import { motion } from "framer-motion";
import Button from "@/components/Button";

const ease: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

interface HeroContentProps {
  eyebrowText: string | null;
  heading: string | null;
  subtitle: string | null;
  ctaText: string | null;
  ctaLink: string | null;
}

export default function HeroContent({
  eyebrowText,
  heading,
  subtitle,
  ctaText,
  ctaLink,
}: HeroContentProps) {
  return (
    <div className="relative z-10 text-center text-white px-4">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease }}
        className="font-heading uppercase tracking-[0.3em] text-sm md:text-base font-semibold text-white/80 mb-6"
      >
        {eyebrowText}
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease }}
        className="font-heading uppercase tracking-[0.15em] text-6xl md:text-8xl font-extrabold mb-6"
      >
        {heading}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7, ease }}
        className="text-lg md:text-xl text-white/80 mb-10 max-w-xl mx-auto"
      >
        {subtitle}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9, ease }}
      >
        <Button variant="primary" href={ctaLink ?? "/book-now"}>
          {ctaText ?? "Book Now"}
        </Button>
      </motion.div>
    </div>
  );
}
