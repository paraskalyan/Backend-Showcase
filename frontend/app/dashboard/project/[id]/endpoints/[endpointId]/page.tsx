import { getSingleEndpoint } from "@/API/EndpointAPIService";
import { EndpointDetailView } from "@/components/project/endpoint-detail-view";
import { mockEndpoint } from "@/helpers/mockData";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string; endpointId: string }>;
}

export default function EndpointDetailPage() {
  const { endpointId } = useParams();
  
  const { data, isLoading } = useQuery({
    queryKey: ["project", endpointId],
    queryFn: () => getSingleEndpoint(String(endpointId)),
  });
  return (
    <EndpointDetailView
      projectId={mockEndpoint.projectId}
      projectName={mockEndpoint.projectName}
      endpointId={mockEndpoint.endpointId}
      endpointName={mockEndpoint.endpointName}
      method={mockEndpoint.method}
      path={mockEndpoint.path}
      description={mockEndpoint.description}
      requestExample={mockEndpoint.requestExample}
      responseExample={mockEndpoint.responseExample}
    />
  );
}
