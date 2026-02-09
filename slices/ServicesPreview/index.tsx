import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { createClient } from "@/prismicio";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import Button from "@/components/Button";

type ServicesPreviewProps = SliceComponentProps<Content.ServicesPreviewSlice>;

export default async function ServicesPreview({ slice }: ServicesPreviewProps) {
  const client = createClient();
  const maxServices = slice.primary.max_services ?? 3;
  const services = await client.getAllByType("service", {
    orderings: [
      { field: "my.service.sort_order" },
      { field: "my.service.title" },
    ],
    limit: maxServices,
  });

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-20 bg-gray-light"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={slice.primary.heading ?? "Services"}
          subtitle={slice.primary.subtitle ?? undefined}
          alignment="center"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={{
                title: service.data.title ?? "",
                description: service.data.description ?? "",
                priceLabel: service.data.price_label ?? "",
                duration: service.data.duration ?? "",
                image: service.data.image,
              }}
            />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button
            variant="outline"
            href={slice.primary.cta_link ?? "/book-now"}
          >
            {slice.primary.cta_text ?? "More Services"}
          </Button>
        </div>
      </div>
    </section>
  );
}
