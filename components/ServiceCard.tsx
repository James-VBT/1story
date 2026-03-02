import type { ImageField } from "@prismicio/client";
import Link from "next/link";
import { PrismicNextImage } from "@prismicio/next";

interface ServiceCardProps {
  service: {
    title: string;
    description: string;
    image: ImageField;
    uid?: string;
  };
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const href = service.uid ? `/services/${service.uid}` : "/book-now";
  return (
    <Link
      href={href}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group flex flex-col h-full"
    >
      {/* Service Image */}
      <div className="aspect-[4/3] relative overflow-hidden">
        <PrismicNextImage
          field={service.image}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-heading uppercase tracking-wider text-sm font-bold mb-2 text-foreground group-hover:text-teal transition-colors">
          {service.title}
        </h3>
        <p className="text-gray-medium text-sm leading-relaxed">
          {service.description}
        </p>
      </div>
    </Link>
  );
}
