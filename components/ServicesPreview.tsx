import { services } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import ServiceCard from "./ServiceCard";
import Button from "./Button";

export default function ServicesPreview() {
  const featured = services.slice(0, 3);

  return (
    <section className="py-20 bg-gray-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Services"
          subtitle="Choose from a variety of coaching services tailored to your needs."
          alignment="center"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {featured.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button variant="outline" href="/book-now">
            More Services
          </Button>
        </div>
      </div>
    </section>
  );
}
