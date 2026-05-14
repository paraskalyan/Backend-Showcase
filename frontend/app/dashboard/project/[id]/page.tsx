"use client";
import { ProjectHeader } from '@/components/project/project-header';
import { EndpointsSection } from '@/components/project/endpoints-section';
import { useQuery } from '@tanstack/react-query';
import { getProject } from '@/API/ProjectAPIService';
import PageLoader from '@/components/PageLoader';
import { useParams } from 'next/navigation';
import { mockEndpoints } from '@/helpers/mockData';


export default function ProjectDetailPage() {
  const { id } = useParams();

  const {data, isLoading} = useQuery({
    queryKey: ["project", id],
    queryFn: () => getProject(id)
  })

  if(isLoading) return <PageLoader/>;


  return (
    <main className="min-h-screen bg-background">
      <ProjectHeader
        projectName={data.name}
        description={data.description}
        visibility={data.visibility}
        createdAt={data.createdAt}
      />
      <EndpointsSection projectId={data.id} endpoints={mockEndpoints} />
    </main>
  );
}
