import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for getting started",
    features: [
      "3 public projects",
      "10 endpoints per project",
      "100 API tests/month",
      "Public profile page",
      "Basic analytics",
    ],
    cta: "Get Started Free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$12",
    period: "/month",
    description: "For serious backend developers",
    features: [
      "Unlimited projects",
      "Unlimited endpoints",
      "Unlimited API tests",
      "Custom domain support",
      "Advanced analytics",
      "Private projects",
      "Priority support",
      "Export to OpenAPI",
    ],
    cta: "Start Pro Trial",
    highlighted: true,
  },
  {
    name: "Team",
    price: "$29",
    period: "/month",
    description: "For teams and agencies",
    features: [
      "Everything in Pro",
      "5 team members",
      "Team collaboration",
      "Shared projects",
      "Role-based access",
      "SSO integration",
      "Dedicated support",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Start free and upgrade as you grow. No hidden fees.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl border p-8 ${
                plan.highlighted
                  ? "border-accent bg-accent/5 shadow-lg shadow-accent/10"
                  : "border-border bg-card"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                  Most Popular
                </span>
              )}
              <div className="text-center">
                <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
                <div className="mt-4 flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  {plan.period && <span className="ml-1 text-muted-foreground">{plan.period}</span>}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <ul className="mt-8 space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-foreground">
                    <Check className="h-4 w-4 shrink-0 text-accent" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                className={`mt-8 w-full ${
                  plan.highlighted
                    ? "bg-accent text-accent-foreground hover:bg-accent/90"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
