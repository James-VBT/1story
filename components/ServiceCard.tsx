import type { ImageField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { HiOutlineClock } from "react-icons/hi2";
import Button from "./Button";

interface ServiceCardProps {
  service: {
    title: string;
    description: string;
    priceLabel: string;
    duration: string;
    image: ImageField;
    uid?: string;
  };
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group flex flex-col h-full">
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
        <h3 className="font-heading uppercase tracking-wider text-sm font-bold mb-2 text-foreground">
          {service.title}
        </h3>
        <p className="text-gray-medium text-sm mb-4 leading-relaxed">
          {service.description}
        </p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-teal font-bold text-lg">
            {service.priceLabel}
          </span>
          <span className="text-gray-medium text-xs flex items-center gap-1">
            <HiOutlineClock size={14} />
            {service.duration}
          </span>
        </div>
        <Button
          variant="primary"
          href={service.uid ? `/services/${service.uid}` : "/book-now"}
          className="w-full text-xs py-2.5 mt-auto"
        >
          Book Now
        </Button>
      </div>
    </div>
  );
}
