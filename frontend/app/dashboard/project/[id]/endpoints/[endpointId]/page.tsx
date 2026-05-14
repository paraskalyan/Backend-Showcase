import { EndpointDetailView } from '@/components/project/endpoint-detail-view';
import { mockEndpoint } from '@/helpers/mockData';

interface PageProps {
  params: Promise<{ id: string; endpointId: string }>;
}

export default async function EndpointDetailPage({ params }: PageProps) {
  const { id, endpointId } = await params;

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
