"use client";

import { useState } from "react";
import { CheckCircle2, Clock, Send, ChevronRight } from "lucide-react";

export function DemoPreview() {
  const [activeTab, setActiveTab] = useState("request");

  return (
    <section className="relative py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
          {/* Browser header */}
          <div className="flex items-center gap-2 border-b border-border bg-secondary/30 px-4 py-3">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <div className="h-3 w-3 rounded-full bg-green-500/80" />
            </div>
            <div className="ml-4 flex flex-1 items-center rounded-md bg-background/50 px-3 py-1.5 text-sm text-muted-foreground">
              <span className="hidden sm:inline">backendfolio.dev/</span>
              <span className="text-foreground">@johndoe</span>
              <span className="hidden sm:inline">/payment-api</span>
            </div>
          </div>

          {/* Content */}
          <div className="grid md:grid-cols-2">
            {/* Left side - Project info */}
            <div className="border-b border-border p-6 md:border-r md:border-b-0">
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Payment API</h3>
                  <p className="mt-1 text-sm text-muted-foreground">by @johndoe</p>
                </div>
                <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                  Public
                </span>
              </div>

              <p className="mb-6 text-sm text-muted-foreground">
                A RESTful payment processing API with support for multiple payment gateways, 
                subscription management, and webhook integrations.
              </p>

              <div className="mb-6">
                <h4 className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {["Node.js", "Express", "PostgreSQL", "Stripe", "Redis"].map((tech) => (
                    <span key={tech} className="rounded-md border border-border bg-secondary/50 px-2 py-1 text-xs text-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Endpoints</h4>
                <div className="space-y-2">
                  {[
                    { method: "POST", path: "/payments/create", color: "bg-green-500/20 text-green-400" },
                    { method: "GET", path: "/payments/:id", color: "bg-blue-500/20 text-blue-400" },
                    { method: "POST", path: "/subscriptions", color: "bg-green-500/20 text-green-400" },
                    { method: "DELETE", path: "/payments/:id", color: "bg-red-500/20 text-red-400" },
                  ].map((endpoint, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-md bg-secondary/30 px-3 py-2 transition-colors hover:bg-secondary/50">
                      <span className={`rounded px-2 py-0.5 text-xs font-mono font-medium ${endpoint.color}`}>
                        {endpoint.method}
                      </span>
                      <span className="font-mono text-sm text-foreground">{endpoint.path}</span>
                      <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side - API Playground */}
            <div className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h4 className="text-sm font-medium text-foreground">API Playground</h4>
                <div className="flex gap-1 rounded-lg bg-secondary/50 p-1">
                  <button
                    onClick={() => setActiveTab("request")}
                    className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                      activeTab === "request"
                        ? "bg-background text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Request
                  </button>
                  <button
                    onClick={() => setActiveTab("response")}
                    className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                      activeTab === "response"
                        ? "bg-background text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Response
                  </button>
                </div>
              </div>

              {activeTab === "request" ? (
                <div className="rounded-lg bg-background/50 p-4">
                  <pre className="overflow-x-auto text-xs text-muted-foreground">
                    <code>{`POST /payments/create

{
  "amount": 9999,
  "currency": "USD",
  "customer_id": "cus_abc123",
  "description": "Pro Plan Subscription",
  "metadata": {
    "plan": "pro",
    "period": "monthly"
  }
}`}</code>
                  </pre>
                </div>
              ) : (
                <div className="rounded-lg bg-background/50 p-4">
                  <pre className="overflow-x-auto text-xs text-muted-foreground">
                    <code>{`{
  "id": "pay_xyz789",
  "status": "succeeded",
  "amount": 9999,
  "currency": "USD",
  "created_at": "2024-01-15T10:30:00Z",
  "customer_id": "cus_abc123"
}`}</code>
                  </pre>
                </div>
              )}

              <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-2.5 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90">
                <Send className="h-4 w-4" />
                Send Request
              </button>

              <div className="mt-6 rounded-lg border border-border bg-secondary/20 p-4">
                <h5 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Recent Tests</h5>
                <div className="space-y-2">
                  {[
                    { status: "success", time: "142ms", ago: "2 min ago" },
                    { status: "success", time: "98ms", ago: "5 min ago" },
                    { status: "success", time: "156ms", ago: "12 min ago" },
                  ].map((test, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                        <span className="text-foreground">200 OK</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {test.time}
                        </span>
                        <span>{test.ago}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
