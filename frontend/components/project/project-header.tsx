'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Edit2, Trash2 } from 'lucide-react';

interface ProjectHeaderProps {
  projectName: string;
  description: string;
  visibility: 'public' | 'private';
  createdAt: string;
}

export function ProjectHeader({
  projectName,
  description,
  visibility,
  createdAt,
}: ProjectHeaderProps) {
  return (
    <div className="border-b border-border bg-card p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>

          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-foreground">{projectName}</h1>
            <Badge variant={visibility === 'public' ? 'default' : 'secondary'}>
              {visibility === 'public' ? '🌐 Public' : '🔒 Private'}
            </Badge>
          </div>

          <p className="text-base text-muted-foreground mb-4 max-w-2xl">
            {description}
          </p>

          <p className="text-xs text-muted-foreground">
            Created on {new Date(createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Edit2 className="h-4 w-4" />
            Edit
          </Button>
          <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
