import Image from "next/image";
import SectionHeading from "./SectionHeading";
import Button from "./Button";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Column */}
          <div>
            <SectionHeading title="About Me" alignment="left" />
            <p className="text-gray-medium mt-6 leading-relaxed">
              With over 15 years of experience in personal and professional
              development, I&apos;ve helped hundreds of individuals transform
              their lives. My approach combines proven coaching methodologies
              with a deep understanding of human behavior to create lasting
              change.
            </p>
            <p className="text-gray-medium mt-4 leading-relaxed">
              Whether you&apos;re looking to advance your career, improve your
              health and wellness, or find greater balance in your life, I&apos;m
              here to guide you every step of the way.
            </p>
            <blockquote className="mt-6 border-l-4 border-teal pl-4 italic text-gray-dark">
              &ldquo;Success is the doing, not the getting; in the trying, not
              the triumph.&rdquo;
              <span className="block text-sm text-gray-medium mt-1 not-italic">
                &mdash; Zig Ziglar
              </span>
            </blockquote>
            <Button variant="outline" href="/book-now" className="mt-8">
              Read More
            </Button>
          </div>

          {/* About Image */}
          <div className="aspect-square relative rounded-lg overflow-hidden">
            <Image
              src="/images/about.jpg"
              alt="Allan Johnson - Personal Life Coach"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
