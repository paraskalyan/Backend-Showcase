'use client';

import { BarChart3, Zap, Activity, TrendingUp } from 'lucide-react';

export function StatsOverview() {
  const stats = [
    {
      label: 'Total Projects',
      value: '12',
      change: '+2 this month',
      icon: BarChart3,
      color: 'bg-blue-500/10 text-blue-400',
    },
    {
      label: 'Total Endpoints',
      value: '47',
      change: '+8 this month',
      icon: Zap,
      color: 'bg-emerald-500/10 text-emerald-400',
    },
    {
      label: 'API Tests',
      value: '1.2K',
      change: '+240 this week',
      icon: Activity,
      color: 'bg-purple-500/10 text-purple-400',
    },
    {
      label: 'Success Rate',
      value: '98.5%',
      change: '+0.5% from last week',
      icon: TrendingUp,
      color: 'bg-pink-500/10 text-pink-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </h3>
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
