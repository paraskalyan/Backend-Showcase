'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Plus, Trash2, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HTTP_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];

interface KeyValuePair {
  key: string;
  value: string;
}

interface FormData {
  name: string;
  description: string;
  url: string;
  method: string;
  headers: KeyValuePair[];
  body: string;
  queryParams: KeyValuePair[];
}

export default function AddEndpointPage() {
  const params = useParams();
  const projectId = params.id as string;

  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    url: '',
    method: 'GET',
    headers: [{ key: '', value: '' }],
    body: '',
    queryParams: [{ key: '', value: '' }],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'basic' | 'headers' | 'query' | 'body'>('basic');

  const handleInputChange = (field: keyof Omit<FormData, 'headers' | 'body' | 'queryParams'>, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBodyChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      body: value,
    }));
  };

  const handleKeyValueChange = (
    field: 'headers' | 'queryParams',
    index: number,
    type: 'key' | 'value',
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) =>
        i === index
          ? { ...item, [type]: value }
          : item
      ),
    }));
  };

  const addKeyValuePair = (field: 'headers' | 'queryParams') => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], { key: '', value: '' }],
    }));
  };

  const removeKeyValuePair = (field: 'headers' | 'queryParams', index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.url.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    // Filter out empty key-value pairs
    const filteredHeaders = formData.headers.filter((h) => h.key.trim() && h.value.trim());
    const filteredQueryParams = formData.queryParams.filter((q) => q.key.trim() && q.value.trim());

    const endpointData = {
      name: formData.name,
      description: formData.description,
      url: formData.url,
      method: formData.method,
      headers: filteredHeaders.length > 0 ? Object.fromEntries(filteredHeaders.map((h) => [h.key, h.value])) : null,
      body: formData.body.trim() ? JSON.parse(formData.body) : null,
      queryParams: filteredQueryParams.length > 0 ? Object.fromEntries(filteredQueryParams.map((q) => [q.key, q.value])) : null,
    };

    console.log('Creating endpoint:', endpointData);

    setTimeout(() => {
      setIsSubmitting(false);
      // In a real app, you would redirect here
    }, 500);
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href={`/dashboard/project/${projectId}`}>
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Project
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Add New Endpoint</h1>
          <p className="text-muted-foreground">
            Configure and test your API endpoint
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tab Navigation */}
          <div className="flex gap-2 border-b border-border">
            {(['basic', 'headers', 'query', 'body'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 font-medium transition-colors border-b-2 ${
                  activeTab === tab
                    ? 'text-accent border-accent'
                    : 'text-muted-foreground border-transparent hover:text-foreground'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Basic Information Tab */}
          {activeTab === 'basic' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Endpoint Name <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="e.g., Get All Products"
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe what this endpoint does..."
                  rows={3}
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    HTTP Method <span className="text-destructive">*</span>
                  </label>
                  <select
                    value={formData.method}
                    onChange={(e) => handleInputChange('method', e.target.value)}
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
                  >
                    {HTTP_METHODS.map((method) => (
                      <option key={method} value={method}>
                        {method}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    URL/Path <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.url}
                    onChange={(e) => handleInputChange('url', e.target.value)}
                    placeholder="e.g., /api/v1/products"
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Headers Tab */}
          {activeTab === 'headers' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-foreground">Request Headers</h3>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => addKeyValuePair('headers')}
                  disabled={isSubmitting}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Header
                </Button>
              </div>

              <div className="space-y-2">
                {formData.headers.map((header, index) => (
                  <div key={index} className="flex gap-2 items-end">
                    <input
                      type="text"
                      placeholder="Header name (e.g., Authorization)"
                      value={header.key}
                      onChange={(e) => handleKeyValueChange('headers', index, 'key', e.target.value)}
                      disabled={isSubmitting}
                      className="flex-1 px-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
                    />
                    <input
                      type="text"
                      placeholder="Value"
                      value={header.value}
                      onChange={(e) => handleKeyValueChange('headers', index, 'value', e.target.value)}
                      disabled={isSubmitting}
                      className="flex-1 px-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
                    />
                    <button
                      type="button"
                      onClick={() => removeKeyValuePair('headers', index)}
                      disabled={isSubmitting || formData.headers.length === 1}
                      className="p-2 text-destructive hover:bg-destructive/10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Query Parameters Tab */}
          {activeTab === 'query' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-foreground">Query Parameters</h3>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => addKeyValuePair('queryParams')}
                  disabled={isSubmitting}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Parameter
                </Button>
              </div>

              <div className="space-y-2">
                {formData.queryParams.map((param, index) => (
                  <div key={index} className="flex gap-2 items-end">
                    <input
                      type="text"
                      placeholder="Parameter name (e.g., page)"
                      value={param.key}
                      onChange={(e) => handleKeyValueChange('queryParams', index, 'key', e.target.value)}
                      disabled={isSubmitting}
                      className="flex-1 px-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
                    />
                    <input
                      type="text"
                      placeholder="Value"
                      value={param.value}
                      onChange={(e) => handleKeyValueChange('queryParams', index, 'value', e.target.value)}
                      disabled={isSubmitting}
                      className="flex-1 px-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
                    />
                    <button
                      type="button"
                      onClick={() => removeKeyValuePair('queryParams', index)}
                      disabled={isSubmitting || formData.queryParams.length === 1}
                      className="p-2 text-destructive hover:bg-destructive/10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Body Tab */}
          {activeTab === 'body' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  Request Body (JSON)
                </label>
                <textarea
                  value={formData.body}
                  onChange={(e) => handleBodyChange(e.target.value)}
                  placeholder={'{\n  "key": "value"\n}'}
                  rows={10}
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground font-mono placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50 resize-none"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Enter valid JSON for the request body. Leave empty if not needed.
                </p>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex gap-3 pt-4 border-t border-border">
            <Link href={`/dashboard/projects/${projectId}`} className="flex-1">
              <Button type="button" variant="ghost" className="w-full" disabled={isSubmitting}>
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Endpoint'}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
