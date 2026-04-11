import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="border-t border-border bg-secondary/10 py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 md:p-16">
          {/* Background decoration */}
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />
          
          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Ready to showcase your backend skills?
            </h2>
            <p className="mt-4 text-pretty text-lg text-muted-foreground">
              Join thousands of backend developers who are already using BackendFolio 
              to share their work and land better opportunities.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="h-12 gap-2 bg-accent px-8 text-accent-foreground hover:bg-accent/90">
                Create Your Portfolio
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="h-12 border-border px-8 text-foreground hover:bg-secondary">
                View Examples
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
