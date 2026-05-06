'use client';

import { useState } from 'react';
import { X, Lock, Globe, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProject: (projectData: {
    name: string;
    description: string;
    visibility: 'Public' | 'Private';
    techStack: string[];
  }) => void;
}

const TECH_STACK_OPTIONS = [
  'Node.js',
  'Python',
  'Go',
  'Java',
  'C#/.NET',
  'Ruby',
  'PHP',
  'Rust',
  'TypeScript',
  'Express.js',
  'Django',
  'FastAPI',
  'Spring Boot',
  'Flask',
  'PostgreSQL',
  'MongoDB',
  'Redis',
  'Docker',
];

export function CreateProjectModal({
  isOpen,
  onClose,
  onCreateProject,
}: CreateProjectModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    visibility: 'Private' as 'Public' | 'Private',
    techStack: [] as string[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleVisibilityChange = (visibility: 'Public' | 'Private') => {
    setFormData((prev) => ({
      ...prev,
      visibility,
    }));
  };

  const handleTechStackToggle = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      techStack: prev.techStack.includes(tech)
        ? prev.techStack.filter((t) => t !== tech)
        : [...prev.techStack, tech],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('Project name is required');
      return;
    }

    setIsSubmitting(true);
    await onCreateProject(formData);
    setFormData({
      name: '',
      description: '',
      visibility: 'Private',
      techStack: [],
    });
    setIsSubmitting(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card border border-border rounded-lg max-w-md w-full shadow-xl animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">Create New Project</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Project Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
              Project Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="My Backend API"
              className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
              disabled={isSubmitting}
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Brief description of your project..."
              rows={3}
              className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-colors resize-none"
              disabled={isSubmitting}
            />
          </div>

          {/* Visibility */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Visibility
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => handleVisibilityChange('Private')}
                disabled={isSubmitting}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                  formData.visibility === 'Private'
                    ? 'bg-accent/10 border-accent text-accent'
                    : 'border-border text-muted-foreground hover:border-accent/50'
                }`}
              >
                <Lock className="w-4 h-4" />
                <span>Private</span>
              </button>
              <button
                type="button"
                onClick={() => handleVisibilityChange('Public')}
                disabled={isSubmitting}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                  formData.visibility === 'Public'
                    ? 'bg-accent/10 border-accent text-accent'
                    : 'border-border text-muted-foreground hover:border-accent/50'
                }`}
              >
                <Globe className="w-4 h-4" />
                <span>Public</span>
              </button>
            </div>
          </div>

          {/* Tech Stack */}
          {/* <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Tech Stack
            </label>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
              {TECH_STACK_OPTIONS.map((tech) => (
                <button
                  key={tech}
                  type="button"
                  onClick={() => handleTechStackToggle(tech)}
                  disabled={isSubmitting}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors text-sm ${
                    formData.techStack.includes(tech)
                      ? 'bg-accent/10 border-accent text-accent'
                      : 'border-border text-muted-foreground hover:border-accent/50'
                  }`}
                >
                  {formData.techStack.includes(tech) && (
                    <Check className="w-4 h-4" />
                  )}
                  <span>{tech}</span>
                </button>
              ))}
            </div>
          </div> */}

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Project'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
