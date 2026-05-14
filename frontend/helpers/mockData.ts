export const mockProject = {
  id: '1',
  name: 'E-Commerce API',
  description: 'RESTful API for a modern e-commerce platform with user authentication, product management, and order processing.',
  visibility: 'public' as const,
  createdAt: '2024-01-15',
};

export const mockEndpoints = [
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

export const mockEndpoint = {
  projectId: '1',
  projectName: 'E-Commerce API',
  endpointId: '1',
  endpointName: 'Get All Products',
  method: 'GET' as const,
  path: '/api/v1/products?page=1&limit=10',
  description: 'Retrieve all products with pagination support. Returns a list of products with basic information.',
  requestExample: `GET /api/v1/products?page=1&limit=10 HTTP/1.1
Host: api.example.com
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json`,
  responseExample: `{
  "success": true,
  "data": [
    {
      "id": "prod_1",
      "name": "Laptop",
      "price": 999.99,
      "category": "Electronics",
      "stock": 45
    },
    {
      "id": "prod_2",
      "name": "Headphones",
      "price": 199.99,
      "category": "Audio",
      "stock": 120
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 245
  }
}`,
};