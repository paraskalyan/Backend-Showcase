'use client';

import { StatsOverview } from '@/components/dashboard/stats-overview';
import { ProjectsList } from '@/components/dashboard/projects-list';
import { RecentActivity } from '@/components/dashboard/recent-activity';

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s an overview of your backend projects and API activity.
          </p>
        </div>

        <div className="space-y-8">
          {/* Stats Overview */}
          <StatsOverview />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ProjectsList />
            </div>

            {/* Recent Activity Sidebar */}
            <div>
              <RecentActivity />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
