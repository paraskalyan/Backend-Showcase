'use client';

import { CheckCircle, AlertCircle, Clock } from 'lucide-react';

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      project: 'E-commerce API',
      endpoint: 'POST /products/create',
      status: 'success',
      time: '2 minutes ago',
      responseTime: '145ms',
    },
    {
      id: 2,
      project: 'User Authentication Service',
      endpoint: 'POST /auth/login',
      status: 'success',
      time: '8 minutes ago',
      responseTime: '89ms',
    },
    {
      id: 3,
      project: 'Real-time Chat API',
      endpoint: 'GET /messages/{id}',
      status: 'success',
      time: '15 minutes ago',
      responseTime: '203ms',
    },
    {
      id: 4,
      project: 'Payment Gateway',
      endpoint: 'POST /transactions',
      status: 'error',
      time: '32 minutes ago',
      responseTime: '1200ms',
    },
    {
      id: 5,
      project: 'E-commerce API',
      endpoint: 'GET /categories',
      status: 'success',
      time: '1 hour ago',
      responseTime: '67ms',
    },
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-xl font-bold text-foreground mb-6">Recent API Tests</h2>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center justify-between py-4 border-b border-border last:border-0"
          >
            <div className="flex items-start gap-4 flex-1">
              <div className="mt-1">
                {activity.status === 'success' ? (
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {activity.endpoint}
                </p>
                <p className="text-xs text-muted-foreground">{activity.project}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-right">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                {activity.responseTime}
              </div>
              <p className="text-xs text-muted-foreground whitespace-nowrap">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
