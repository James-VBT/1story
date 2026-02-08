import Image from "next/image";
import { HiOutlineClock } from "react-icons/hi2";
import type { Service } from "@/lib/data";
import Button from "./Button";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      {/* Service Image */}
      <div className="aspect-[4/3] relative overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="p-6">
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
        <Button variant="primary" className="w-full text-xs py-2.5">
          Book Now
        </Button>
      </div>
    </div>
  );
}
