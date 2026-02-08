import { HiOutlineCheck } from "react-icons/hi2";
import type { Plan } from "@/lib/data";
import Button from "./Button";

interface PlanCardProps {
  plan: Plan;
}

export default function PlanCard({ plan }: PlanCardProps) {
  return (
    <div
      className={`rounded-lg bg-white/50 border-2 p-8 text-center transition-transform duration-300 ${
        plan.featured
          ? "border-teal shadow-xl scale-105"
          : "border-foreground/20 shadow-md hover:shadow-lg"
      }`}
    >
      <h3 className="font-heading uppercase tracking-[0.15em] text-xl font-bold text-foreground">
        {plan.name}
      </h3>

      <p className="text-gray-medium text-sm mt-2">{plan.description}</p>

      {/* Price */}
      <div className="my-6">
        <span className="text-sm align-top text-gray-medium">$</span>
        <span className="text-5xl font-extrabold text-foreground">
          {plan.price}
        </span>
      </div>

      {/* Savings badge */}
      <p className="text-sm text-gray-medium">
        Save {plan.savings}
      </p>

      {/* Duration */}
      <p className="text-sm text-gray-medium mt-1">
        Valid for {plan.duration}
      </p>

      <hr className="my-6 border-foreground/10" />

      {/* Features */}
      <ul className="space-y-3 text-left mb-8">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-gray-dark">
            <HiOutlineCheck className="text-teal mt-0.5 flex-shrink-0" size={18} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Button variant={plan.featured ? "primary" : "outline"} className="w-full">
        Select
      </Button>
    </div>
  );
}
