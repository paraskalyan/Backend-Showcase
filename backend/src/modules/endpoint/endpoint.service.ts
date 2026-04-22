import { prisma } from "../../lib/prisma.js";

type EndpointInput = {
  name: string;
  description: string;
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  headers?: any;
  body?: any;
  queryParams?: any;
  projectId: string;
};

type UpdateEndpointInput = Partial<EndpointInput>;

export const getAllEndpoints = async (projectId: string) => {
  return prisma.endpoint.findMany({
    where: { projectId },
    orderBy: { createdAt: "desc" },
  });
};

export const createEndpoint = async (data: EndpointInput) => {
  return prisma.endpoint.create({
    data: {
      name: data.name,
      description: data.description,
      url: data.url,
      method: data.method,
      headers: data.headers,
      body: data.body,
      queryParams: data.queryParams,
      projectId: data.projectId,
    },
  });
};

export const updateEndpoint = async (
  id: string,
  data: UpdateEndpointInput
) => {
  return prisma.endpoint.update({
    where: { id },
    data: {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.url !== undefined && { url: data.url }),
      ...(data.method !== undefined && { method: data.method }),
      ...(data.headers !== undefined && { headers: data.headers }),
      ...(data.body !== undefined && { body: data.body }),
      ...(data.queryParams !== undefined && { queryParams: data.queryParams }),
    },
  });
};

export const deleteEndpoint = async (id: string) => {
  return prisma.endpoint.delete({
    where: { id },
  });
};