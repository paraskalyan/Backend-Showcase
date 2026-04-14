'use client';

import { Plus, Globe, Lock, ExternalLink, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ProjectsList() {
  const projects = [
    {
      id: 1,
      name: 'E-commerce API',
      description: 'RESTful API for online shopping platform',
      endpoints: 12,
      tests: 256,
      visibility: 'Public',
      techStack: ['Node.js', 'Express', 'PostgreSQL'],
      successRate: 99.2,
    },
    {
      id: 2,
      name: 'User Authentication Service',
      description: 'OAuth2 and JWT-based auth microservice',
      endpoints: 8,
      tests: 142,
      visibility: 'Private',
      techStack: ['Python', 'FastAPI', 'Redis'],
      successRate: 98.8,
    },
    {
      id: 3,
      name: 'Real-time Chat API',
      description: 'WebSocket-based messaging service',
      endpoints: 15,
      tests: 389,
      visibility: 'Public',
      techStack: ['Go', 'WebSocket', 'MongoDB'],
      successRate: 99.5,
    },
    {
      id: 4,
      name: 'Payment Gateway',
      description: 'Payment processing and transaction management',
      endpoints: 10,
      tests: 198,
      visibility: 'Private',
      techStack: ['Java', 'Spring Boot', 'MySQL'],
      successRate: 99.9,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Your Projects</h2>
        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Create Project
        </Button>
      </div>

      <div className="grid gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    {project.name}
                  </h3>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                      project.visibility === 'Public'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-red-500/10 text-red-400'
                    }`}
                  >
                    {project.visibility === 'Public' ? (
                      <Globe className="w-3 h-3" />
                    ) : (
                      <Lock className="w-3 h-3" />
                    )}
                    {project.visibility}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>
              </div>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <Settings className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded bg-muted text-muted-foreground text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex gap-6 text-sm">
                <div>
                  <span className="text-muted-foreground">Endpoints:</span>
                  <p className="font-semibold text-foreground">{project.endpoints}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">API Tests:</span>
                  <p className="font-semibold text-foreground">{project.tests}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Success Rate:</span>
                  <p className="font-semibold text-emerald-400">
                    {project.successRate}%
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-accent hover:text-accent/80">
                View Project
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
