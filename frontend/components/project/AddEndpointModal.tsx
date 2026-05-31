"use client";

import { useState } from "react";
import { X, Plus, Trash2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AddEndpointModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEndpoint: (endpointData: {
    name: string;
    description: string;
    url: string;
    method: string;
    headers: Record<string, string>;
    body: Record<string, unknown>;
    queryParams: Record<string, string>;
  }) => void;
}

const HTTP_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"];

export function AddEndpointModal({
  isOpen,
  onClose,
  onAddEndpoint,
}: AddEndpointModalProps) {
  const [activeTab, setActiveTab] = useState<
    "basic" | "headers" | "query" | "body"
  >("basic");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    url: "",
    method: "GET",
    headers: {} as Record<string, string>,
    body: {} as Record<string, unknown>,
    queryParams: {} as Record<string, string>,
  });
  const [headerInputs, setHeaderInputs] = useState<
    { key: string; value: string }[]
  >([]);
  const [queryInputs, setQueryInputs] = useState<
    { key: string; value: string }[]
  >([]);
  const [bodyJson, setBodyJson] = useState("{}");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBasicChange = (
    field: "name" | "description" | "url" | "method",
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addHeaderInput = () => {
    setHeaderInputs((prev) => [...prev, { key: "", value: "" }]);
  };

  const removeHeaderInput = (index: number) => {
    setHeaderInputs((prev) => prev.filter((_, i) => i !== index));
  };

  const updateHeaderInput = (
    index: number,
    field: "key" | "value",
    value: string,
  ) => {
    setHeaderInputs((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const addQueryInput = () => {
    setQueryInputs((prev) => [...prev, { key: "", value: "" }]);
  };

  const removeQueryInput = (index: number) => {
    setQueryInputs((prev) => prev.filter((_, i) => i !== index));
  };

  const updateQueryInput = (
    index: number,
    field: "key" | "value",
    value: string,
  ) => {
    setQueryInputs((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.url.trim()) {
      alert("Please fill in name and URL");
      return;
    }

    setIsSubmitting(true);

    try {
      // Parse headers
      const headers = headerInputs.reduce(
        (acc, { key, value }) => {
          if (key.trim()) {
            acc[key.trim()] = value;
          }
          return acc;
        },
        {} as Record<string, string>,
      );

      // Parse query params
      const queryParams = queryInputs.reduce(
        (acc, { key, value }) => {
          if (key.trim()) {
            acc[key.trim()] = value;
          }
          return acc;
        },
        {} as Record<string, string>,
      );

      // Parse body
      let body = {};
      try {
        body = bodyJson.trim() ? JSON.parse(bodyJson) : {};
      } catch {
        alert("Invalid JSON in body");
        setIsSubmitting(false);
        return;
      }

      const endpointData = {
        ...formData,
        headers,
        queryParams,
        body,
      };

      console.log(endpointData);

      onAddEndpoint(endpointData);

      // Reset form
      setFormData({
        name: "",
        description: "",
        url: "",
        method: "GET",
        headers: {},
        body: {},
        queryParams: {},
      });
      setHeaderInputs([]);
      setQueryInputs([]);
      setBodyJson("{}");
      setActiveTab("basic");
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">
            Add New Endpoint
          </h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          {["basic", "headers", "query", "body"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as typeof activeTab)}
              className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 ${
                activeTab === tab
                  ? "text-accent border-b-accent"
                  : "text-muted-foreground border-b-transparent hover:text-foreground"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
          {/* Basic Tab */}
          {activeTab === "basic" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Endpoint Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleBasicChange("name", e.target.value)}
                  placeholder="e.g., Get User Profile"
                  className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    handleBasicChange("description", e.target.value)
                  }
                  placeholder="Describe what this endpoint does..."
                  rows={3}
                  className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-colors resize-none"
                  disabled={isSubmitting}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    HTTP Method *
                  </label>
                  <select
                    value={formData.method}
                    onChange={(e) =>
                      handleBasicChange("method", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-colors appearance-none cursor-pointer"
                    disabled={isSubmitting}
                  >
                    {HTTP_METHODS.map((method) => (
                      <option key={method} value={method}>
                        {method}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    URL *
                  </label>
                  <input
                    type="text"
                    value={formData.url}
                    onChange={(e) => handleBasicChange("url", e.target.value)}
                    placeholder="e.g., /api/users/:id"
                    className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Headers Tab */}
          {activeTab === "headers" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-foreground">HTTP Headers</h3>
                <Button
                  type="button"
                  onClick={addHeaderInput}
                  disabled={isSubmitting}
                  size="sm"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Header
                </Button>
              </div>

              {headerInputs.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  No headers added yet.
                </p>
              ) : (
                <div className="space-y-3">
                  {headerInputs.map((header, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={header.key}
                        onChange={(e) =>
                          updateHeaderInput(index, "key", e.target.value)
                        }
                        placeholder="Key"
                        className="flex-1 px-3 py-2 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-colors text-sm"
                        disabled={isSubmitting}
                      />
                      <input
                        type="text"
                        value={header.value}
                        onChange={(e) =>
                          updateHeaderInput(index, "value", e.target.value)
                        }
                        placeholder="Value"
                        className="flex-1 px-3 py-2 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-colors text-sm"
                        disabled={isSubmitting}
                      />
                      <button
                        type="button"
                        onClick={() => removeHeaderInput(index)}
                        disabled={isSubmitting}
                        className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Query Tab */}
          {activeTab === "query" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-foreground">
                  Query Parameters
                </h3>
                <Button
                  type="button"
                  onClick={addQueryInput}
                  disabled={isSubmitting}
                  size="sm"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Parameter
                </Button>
              </div>

              {queryInputs.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  No query parameters added yet.
                </p>
              ) : (
                <div className="space-y-3">
                  {queryInputs.map((param, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={param.key}
                        onChange={(e) =>
                          updateQueryInput(index, "key", e.target.value)
                        }
                        placeholder="Key"
                        className="flex-1 px-3 py-2 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-colors text-sm"
                        disabled={isSubmitting}
                      />
                      <input
                        type="text"
                        value={param.value}
                        onChange={(e) =>
                          updateQueryInput(index, "value", e.target.value)
                        }
                        placeholder="Value"
                        className="flex-1 px-3 py-2 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-colors text-sm"
                        disabled={isSubmitting}
                      />
                      <button
                        type="button"
                        onClick={() => removeQueryInput(index)}
                        disabled={isSubmitting}
                        className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Body Tab */}
          {activeTab === "body" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Request Body (JSON)
                </label>
                <textarea
                  value={bodyJson}
                  onChange={(e) => setBodyJson(e.target.value)}
                  placeholder="{}"
                  rows={6}
                  className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-colors resize-none font-mono text-sm"
                  disabled={isSubmitting}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Enter valid JSON format for the request body
                </p>
              </div>
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-border bg-card">
          <Button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            variant="outline"
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            {isSubmitting ? "Adding..." : "Add Endpoint"}
          </Button>
        </div>
      </div>
    </div>
  );
}
