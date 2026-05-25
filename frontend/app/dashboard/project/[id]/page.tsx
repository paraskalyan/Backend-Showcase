"use client";
import { ProjectHeader } from "@/components/project/project-header";
import { EndpointsSection } from "@/components/project/endpoints-section";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteProject, getProject } from "@/API/ProjectAPIService";
import PageLoader from "@/components/PageLoader";
import { useParams } from "next/navigation";
import { mockEndpoints } from "@/helpers/mockData";
import { AddEndpointModal } from "@/components/project/AddEndpointModal";
import { useState } from "react";
import { createEndpoint, getEndpoints } from "@/API/EndpointAPIService";
import { EndpointData } from "@/constants/types";
import { toast } from "sonner";

export default function ProjectDetailPage() {
  const [isAddEndpointModalOpen, setIsAddEndpointModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["project", id],
    queryFn: () => getProject(String(id)),
  });

  const { data: endpointsData, isLoading: endpointsLoading } = useQuery({
    queryKey: ["endpoints", String(id)],
    queryFn: () => getEndpoints(String(id)),
  });


  const mutation = useMutation({
    mutationFn: (data: EndpointData) => createEndpoint(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["endpoints", String(id)],
      });
      toast.success("Endpoint created");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteProject(id),
  });

  const handleAddEndpoint = (endpointData: EndpointData) => {
    endpointData.projectId = String(id);
    mutation.mutate(endpointData);
    setIsAddEndpointModalOpen(false);
  };

  const handleDeleteProject = () => {
    deleteMutation.mutate(String(id));
  };

  if (isLoading || endpointsLoading) return <PageLoader />;

  return (
    <main className="min-h-screen bg-background mx-[10%]">
      <ProjectHeader
        projectName={data?.name}
        description={data?.description}
        visibility={data?.visibility}
        createdAt={data?.createdAt}
        onDeleteProject={handleDeleteProject}
      />
      <EndpointsSection
        projectId={data?.id}
        endpoints={endpointsData.data}
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
