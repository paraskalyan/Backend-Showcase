"use client";
import { getSingleEndpoint } from "@/API/EndpointAPIService";
import { EndpointDetailView } from "@/components/project/endpoint-detail-view";
import { mockEndpoint } from "@/helpers/mockData";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function EndpointDetailPage() {
  const { endpointId } = useParams();

  const { data: endpoint, isLoading } = useQuery({
    queryKey: ['singleEndpoint', endpointId],
    queryFn: () => getSingleEndpoint(String(endpointId)),
  });
  return (
    <EndpointDetailView
      projectId={endpoint.projectId}
      projectName={endpoint.projectName}
      endpointId={endpoint.id}
      endpointName={endpoint.name}
      method={endpoint.method}
      path={endpoint.url}
      description={endpoint.description}
      requestExample={endpoint.requestExample}
      responseExample={endpoint.responseExample}
    />
  );
}
