import { UserPlus, FolderPlus, Rocket } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Create Your Profile",
    description: "Sign up in seconds and set up your developer profile. Add your bio, skills, and social links.",
  },
  {
    icon: FolderPlus,
    step: "02",
    title: "Add Your Projects",
    description: "Document your backend projects with endpoints, tech stacks, and descriptions. Import from OpenAPI specs or add manually.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Share & Get Noticed",
    description: "Share your portfolio with recruiters, clients, or the community. Let them test your APIs live.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="border-y border-border bg-secondary/10 py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Get started in minutes
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Three simple steps to showcase your backend expertise to the world.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="absolute top-12 right-0 hidden h-px w-full translate-x-1/2 bg-border md:block" />
              )}
              <div className="relative flex flex-col items-center text-center">
                <div className="relative">
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-border bg-card">
                    <step.icon className="h-10 w-10 text-accent" />
                  </div>
                  <span className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
                    {step.step}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
