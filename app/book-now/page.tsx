import { services } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";

export default function GalleryPage() {
  return (
    <main className="pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Gallery"
          subtitle="Choose from a variety of coaching services tailored to your needs."
          alignment="center"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </main>
  );
}
