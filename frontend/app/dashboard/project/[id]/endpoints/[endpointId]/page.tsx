"use client";
import { getSingleEndpoint } from "@/API/EndpointAPIService";
import PageLoader from "@/components/PageLoader";
import { EndpointDetailView } from "@/components/project/endpoint-detail-view";
import { mockEndpoint } from "@/helpers/mockData";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function EndpointDetailPage() {
  const { endpointId } = useParams();

  const { data: endpointData, isLoading } = useQuery({
    queryKey: ["singleEndpoint", endpointId],
    queryFn: () => getSingleEndpoint(String(endpointId)),
  });
  console.log(endpointData)

  if(isLoading) return <PageLoader/>

  return (
    <div>{endpointData && <EndpointDetailView endpoint={endpointData.data} />}</div>
  );
}
