export function StatsSection() {
  const stats = [
    { value: "10K+", label: "Developers" },
    { value: "50K+", label: "APIs Documented" },
    { value: "2M+", label: "API Tests Run" },
    { value: "99.9%", label: "Uptime" },
  ];

  return (
    <section className="border-y border-border bg-secondary/20 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-foreground md:text-4xl">{stat.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
