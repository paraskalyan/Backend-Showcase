"use client";
import { ProjectHeader } from "@/components/project/project-header";
import { EndpointsSection } from "@/components/project/endpoints-section";
import { useQuery } from "@tanstack/react-query";
import { getProject } from "@/API/ProjectAPIService";
import PageLoader from "@/components/PageLoader";
import { useParams } from "next/navigation";
import { mockEndpoints } from "@/helpers/mockData";
import { AddEndpointModal } from "@/components/project/AddEndpointModal";
import { useState } from "react";

export default function ProjectDetailPage() {
  const [isAddEndpointModalOpen, setIsAddEndpointModalOpen] = useState(false);

  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["project", id],
    queryFn: () => getProject(id),
  });

  const handleAddEndpoint = (endpointData: {
    name: string;
    description: string;
    url: string;
    method: string;
    headers: Record<string, string>;
    body: Record<string, unknown>;
    queryParams: Record<string, string>;
  }) => {
    console.log("Adding endpoint:", endpointData);
    // Here you would typically make an API call to create the endpoint
    setIsAddEndpointModalOpen(false);
  };

  if (isLoading) return <PageLoader />;

  return (
    <main className="min-h-screen bg-background mx-[10%]">
      <ProjectHeader
        projectName={data.name}
        description={data.description}
        visibility={data.visibility}
        createdAt={data.createdAt}
      />
      <EndpointsSection
        projectId={data.id}
        endpoints={mockEndpoints}
        onAddEndpoint={() => setIsAddEndpointModalOpen(true)}
      />
      <AddEndpointModal
        isOpen={isAddEndpointModalOpen}
        onClose={() => setIsAddEndpointModalOpen(false)}
        onAddEndpoint={handleAddEndpoint}
      />
    </main>
  );
}
