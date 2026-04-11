import { 
  FolderKanban, 
  FileCode2, 
  Play, 
  History, 
  Share2, 
  Sliders,
  Eye,
  BarChart3
} from "lucide-react";

const features = [
  {
    icon: FolderKanban,
    title: "Project Showcase",
    description: "Create multiple backend projects with names, descriptions, and tech stacks. Build your portfolio that shows your real skills.",
  },
  {
    icon: FileCode2,
    title: "API Endpoint Listing",
    description: "Document every endpoint with descriptions, request parameters, and expected responses. Make your APIs self-explanatory.",
  },
  {
    icon: Play,
    title: "Live API Testing",
    description: "Anyone can test your APIs directly from your portfolio. Send requests and see responses in real-time.",
  },
  {
    icon: Sliders,
    title: "API Playground",
    description: "Modify request data before testing. Try different inputs and see outputs instantly without any setup.",
  },
  {
    icon: History,
    title: "Execution History",
    description: "Track every API test with success/failure status, response times, and timestamps. Debug with confidence.",
  },
  {
    icon: Share2,
    title: "Shareable Profiles",
    description: "Get a public profile page and shareable links for each project. Share your work with recruiters and teams.",
  },
  {
    icon: Eye,
    title: "Visibility Control",
    description: "Choose what to share. Set projects as public for everyone or private for your eyes only.",
  },
  {
    icon: BarChart3,
    title: "Basic Insights",
    description: "Track API usage, success rates, and performance trends. Understand how your APIs are being used.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need to showcase your backend work
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            From documenting your APIs to letting anyone test them live. 
            BackendFolio has all the tools backend developers need.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-accent/50 hover:bg-card/80"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 font-semibold text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
