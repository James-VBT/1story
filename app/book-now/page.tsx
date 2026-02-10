import type { Metadata } from "next";
import { createClient } from "@/prismicio";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("gallery_page");

  return {
    title: page.data.meta_title ?? undefined,
    description: page.data.meta_description ?? undefined,
  };
}

export default async function GalleryPage() {
  const client = createClient();
  const [page, services] = await Promise.all([
    client.getSingle("gallery_page"),
    client.getAllByType("service", {
      orderings: [
        { field: "my.service.sort_order" },
        { field: "my.service.title" },
      ],
    }),
  ]);

  return (
    <main className="pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading
            title={page.data.heading ?? "Gallery"}
            subtitle={page.data.subtitle ?? undefined}
            alignment="center"
          />
        </FadeIn>
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {services.map((service) => (
            <StaggerItem key={service.id}>
              <ServiceCard
                service={{
                  title: service.data.title ?? "",
                  description: service.data.description ?? "",
                  priceLabel: service.data.price_label ?? "",
                  duration: service.data.duration ?? "",
                  image: service.data.image,
                }}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </main>
  );
}
