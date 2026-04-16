'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ChevronLeft, Play, Copy, Code } from 'lucide-react';
import { useState } from 'react';

interface EndpointDetailViewProps {
  projectId: string;
  projectName: string;
  endpointId: string;
  endpointName: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description?: string;
  requestExample?: string;
  responseExample?: string;
}

const methodColors: Record<string, string> = {
  GET: 'bg-blue-500/20 text-blue-300',
  POST: 'bg-green-500/20 text-green-300',
  PUT: 'bg-yellow-500/20 text-yellow-300',
  DELETE: 'bg-red-500/20 text-red-300',
  PATCH: 'bg-purple-500/20 text-purple-300',
};

export function EndpointDetailView({
  projectId,
  projectName,
  endpointId,
  endpointName,
  method,
  path,
  description,
  requestExample,
  responseExample,
}: EndpointDetailViewProps) {
  const [activeTab, setActiveTab] = useState<'request' | 'response'>('request');
  const [testResult, setTestResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTestEndpoint = async () => {
    setIsLoading(true);
    // Simulate API test
    setTimeout(() => {
      setTestResult({
        statusCode: 200,
        time: '245ms',
        size: '2.3kb',
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card p-6">
        <Link
          href={`/dashboard/projects/${projectId}`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to {projectName}
        </Link>

        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Badge className={`${methodColors[method]} font-mono font-semibold`}>
                {method}
              </Badge>
              <h1 className="text-3xl font-bold text-foreground">{endpointName}</h1>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <code className="text-sm bg-muted px-3 py-1 rounded font-mono text-foreground">
                {path}
              </code>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  navigator.clipboard.writeText(path);
                }}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>

            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>

          <Button
            size="lg"
            onClick={handleTestEndpoint}
            disabled={isLoading}
          >
            <Play className="h-4 w-4" />
            {isLoading ? 'Testing...' : 'Test Endpoint'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        {/* Request/Response */}
        <Card className="border-border">
          <div className="flex gap-0 border-b border-border">
            <button
              onClick={() => setActiveTab('request')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'request'
                  ? 'border-b-2 border-accent text-accent'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Request
            </button>
            <button
              onClick={() => setActiveTab('response')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'response'
                  ? 'border-b-2 border-accent text-accent'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Response
            </button>
          </div>

          <div className="p-4">
            {activeTab === 'request' ? (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase mb-2 block">
                    Request Body
                  </label>
                  <div className="bg-muted rounded p-3 font-mono text-xs text-foreground overflow-auto max-h-60">
                    <pre>{requestExample || 'No request body'}</pre>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase mb-2 block">
                    Response Example
                  </label>
                  <div className="bg-muted rounded p-3 font-mono text-xs text-foreground overflow-auto max-h-60">
                    <pre>{responseExample || 'No response example'}</pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Test Results */}
        <Card className="border-border">
          <div className="px-4 py-3 border-b border-border">
            <h3 className="font-semibold text-foreground">Test Results</h3>
          </div>

          <div className="p-4">
            {testResult ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-500/10 rounded border border-green-500/20">
                  <span className="text-sm font-medium text-green-300">Status Code</span>
                  <span className="text-2xl font-bold text-green-300">{testResult.statusCode}</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-muted rounded">
                    <p className="text-xs text-muted-foreground mb-1">Response Time</p>
                    <p className="text-lg font-semibold text-foreground">{testResult.time}</p>
                  </div>
                  <div className="p-3 bg-muted rounded">
                    <p className="text-xs text-muted-foreground mb-1">Response Size</p>
                    <p className="text-lg font-semibold text-foreground">{testResult.size}</p>
                  </div>
                </div>

                <div className="p-3 bg-muted rounded">
                  <p className="text-xs text-muted-foreground mb-2">Response Body</p>
                  <pre className="font-mono text-xs text-foreground overflow-auto max-h-40 bg-background rounded p-2">
{`{
  "success": true,
  "data": {...}
}`}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Code className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Click "Test Endpoint" to see results
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
