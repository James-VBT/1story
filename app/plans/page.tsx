import { plans } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";
import PlanCard from "@/components/PlanCard";

export default function PlansPage() {
  return (
    <main className="pt-28 pb-20 bg-gray-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Coaching Plans"
          subtitle="Choose the plan that fits your journey."
          alignment="center"
        />
        <div className="grid md:grid-cols-3 gap-8 mt-12 items-start">
          {plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>
      </div>
    </main>
  );
}
