'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Empty } from '@/components/ui/empty';
import { Plus, Play, Copy, Trash2 } from 'lucide-react';

interface Endpoint {
  id: string;
  name: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description?: string;
  lastTested?: string;
  successRate?: number;
}

interface EndpointsSectionProps {
  projectId: string;
  endpoints: Endpoint[];
}

const methodColors: Record<string, string> = {
  GET: 'bg-blue-500/20 text-blue-300',
  POST: 'bg-green-500/20 text-green-300',
  PUT: 'bg-yellow-500/20 text-yellow-300',
  DELETE: 'bg-red-500/20 text-red-300',
  PATCH: 'bg-purple-500/20 text-purple-300',
};

export function EndpointsSection({ projectId, endpoints }: EndpointsSectionProps) {
  if (endpoints.length === 0) {
    return (
      <div className="p-8">
        <Empty
          icon="code"
          title="No Endpoints Yet"
          description="Start building your API by adding your first endpoint"
          action={
            <Link href={`/dashboard/projects/${projectId}/endpoints/new`}>
              <Button>
                <Plus className="h-4 w-4" />
                Add Your First Endpoint
              </Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="space-y-4 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">API Endpoints</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {endpoints.length} endpoint{endpoints.length !== 1 ? 's' : ''} configured
          </p>
        </div>
        <Link href={`/dashboard/projects/${projectId}/endpoints/new`}>
          <Button>
            <Plus className="h-4 w-4" />
            Add Endpoint
          </Button>
        </Link>
      </div>

      <div className="space-y-2">
        {endpoints.map((endpoint) => (
          <Link key={endpoint.id} href={`/dashboard/projects/${projectId}/endpoints/${endpoint.id}`}>
            <div className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer group">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 flex items-start gap-4">
                  <Badge className={`${methodColors[endpoint.method]} font-mono font-semibold flex-shrink-0 mt-0.5`}>
                    {endpoint.method}
                  </Badge>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                      {endpoint.name}
                    </h3>
                    <p className="text-sm text-muted-foreground font-mono truncate">
                      {endpoint.path}
                    </p>
                    {endpoint.description && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {endpoint.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {endpoint.lastTested && (
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Last tested</p>
                      <p className="text-xs font-medium text-foreground">
                        {new Date(endpoint.lastTested).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  {endpoint.successRate !== undefined && (
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Success Rate</p>
                      <p className={`text-xs font-semibold ${endpoint.successRate >= 90 ? 'text-green-400' : endpoint.successRate >= 70 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {endpoint.successRate}%
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7"
                  onClick={(e) => {
                    e.preventDefault();
                    // Copy endpoint details
                  }}
                >
                  <Copy className="h-3.5 w-3.5" />
                  Copy
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7"
                  onClick={(e) => {
                    e.preventDefault();
                    // Test endpoint
                  }}
                >
                  <Play className="h-3.5 w-3.5" />
                  Test
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 text-destructive hover:bg-destructive/10"
                  onClick={(e) => {
                    e.preventDefault();
                    // Delete endpoint
                  }}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete
                </Button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
