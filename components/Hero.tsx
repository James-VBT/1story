import Image from "next/image";
import Button from "./Button";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/hero-bg.jpg"
        alt="Mountain landscape"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-navy/60" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <p className="font-heading uppercase tracking-[0.3em] text-sm md:text-base font-semibold text-white/80 mb-6">
          Ambition is the first step towards
        </p>
        <h1 className="font-heading uppercase tracking-[0.15em] text-6xl md:text-8xl font-extrabold mb-6">
          Success
        </h1>
        <p className="text-lg md:text-xl text-white/80 mb-10 max-w-xl mx-auto">
          Now Available for Online Coaching
        </p>
        <Button variant="primary" href="/book-now">
          Book Now
        </Button>
      </div>
    </section>
  );
}
