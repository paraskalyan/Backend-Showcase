import { ProjectHeader } from '@/components/project/project-header';
import { EndpointsSection } from '@/components/project/endpoints-section';

// Mock data - replace with actual data fetching
const mockProject = {
  id: '1',
  name: 'E-Commerce API',
  description: 'RESTful API for a modern e-commerce platform with user authentication, product management, and order processing.',
  visibility: 'public' as const,
  createdAt: '2024-01-15',
};

const mockEndpoints = [
  {
    id: '1',
    name: 'Get All Products',
    method: 'GET' as const,
    path: '/api/v1/products',
    description: 'Retrieve all products with pagination support',
    lastTested: '2024-04-10',
    successRate: 99.5,
  },
  {
    id: '2',
    name: 'Create Product',
    method: 'POST' as const,
    path: '/api/v1/products',
    description: 'Add a new product to the catalog',
    lastTested: '2024-04-09',
    successRate: 98,
  },
  {
    id: '3',
    name: 'Update Product',
    method: 'PUT' as const,
    path: '/api/v1/products/:id',
    description: 'Update product details and inventory',
    lastTested: '2024-04-08',
    successRate: 97.2,
  },
  {
    id: '4',
    name: 'Delete Product',
    method: 'DELETE' as const,
    path: '/api/v1/products/:id',
    description: 'Remove a product from the catalog',
    lastTested: '2024-04-07',
    successRate: 100,
  },
  {
    id: '5',
    name: 'User Login',
    method: 'POST' as const,
    path: '/api/v1/auth/login',
    description: 'Authenticate user and return JWT token',
    lastTested: '2024-04-10',
    successRate: 99.8,
  },
];

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;

  // In a real app, fetch project data based on id
  // const project = await fetchProject(id);
  // const endpoints = await fetchProjectEndpoints(id);

  return (
    <main className="min-h-screen bg-background">
      <ProjectHeader
        projectName={mockProject.name}
        description={mockProject.description}
        visibility={mockProject.visibility}
        createdAt={mockProject.createdAt}
      />
      <EndpointsSection projectId={mockProject.id} endpoints={mockEndpoints} />
    </main>
  );
}
