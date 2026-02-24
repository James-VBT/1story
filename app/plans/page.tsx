import type { Metadata } from "next";
import { createClient } from "@/prismicio";
import SectionHeading from "@/components/SectionHeading";
import PlanCard from "@/components/PlanCard";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("plans_page");

  const title = page.data.meta_title ?? undefined;
  const description = page.data.meta_description ?? undefined;

  return {
    title,
    description,
    alternates: { canonical: "/plans" },
    openGraph: { title, description, url: "/plans" },
    twitter: { title, description },
  };
}

export default async function PlansPage() {
  const client = createClient();
  const [page, plans] = await Promise.all([
    client.getSingle("plans_page"),
    client.getAllByType("plan", {
      orderings: [{ field: "my.plan.sort_order" }],
    }),
  ]);

  return (
    <main className="pt-28 pb-20 bg-gray-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading
            title={page.data.heading ?? "Coaching Plans"}
            subtitle={page.data.subtitle ?? undefined}
            alignment="center"
          />
        </FadeIn>
        <StaggerContainer className="grid md:grid-cols-3 gap-8 mt-12 items-start">
          {plans.map((plan) => (
            <StaggerItem key={plan.id}>
              <PlanCard
                plan={{
                  name: plan.data.name ?? "",
                  price: plan.data.price ?? 0,
                  savings: plan.data.savings ?? "",
                  duration: plan.data.duration ?? "",
                  description: plan.data.description ?? "",
                  features: plan.data.features.map(
                    (f) => f.feature_text ?? ""
                  ),
                  featured: plan.data.featured ?? false,
                }}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </main>
  );
}
