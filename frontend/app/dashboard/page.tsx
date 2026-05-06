'use client';

import { StatsOverview } from '@/components/dashboard/stats-overview';
import { ProjectsList } from '@/components/dashboard/projects-list';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createProject, getAllProjects } from '@/API/ProjectAPIService';
import PageLoader from '@/components/PageLoader';
import { toast } from 'sonner';
import { CreateProjectModal } from '@/components/dashboard/CreateProjectModal';
import { useState } from 'react';
import { Project } from '@/constants/types';

export default function DashboardPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const {data, isLoading, isError, error} = useQuery({
    queryKey: ['dashboardData'],
    queryFn: () => getAllProjects(),
    
  })

  const mutation = useMutation({
    mutationFn: (data: Project)=> createProject(data),
  })

  const handleCreateProject = (data: Project)=>{
    console.log("Data, ", data)
    mutation.mutate(data)
  }
  
  if(isLoading) return <PageLoader/>;
  if(isError) return toast.error(error?.message);

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s an overview of your backend projects and API activity.
          </p>
        </div>

        <div className="space-y-8">
          {/* Stats Overview */}
          <StatsOverview />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ProjectsList onCreateProject={()=> setIsCreateModalOpen(true)} projects={data} />
            </div>

            {/* Recent Activity Sidebar */}
            <div>
              <RecentActivity />
            </div>
          </div>
        </div>
      </div>
       <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateProject={handleCreateProject}
      />
    </main>
  );
}
