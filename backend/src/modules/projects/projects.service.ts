import { prisma } from "../../lib/prisma.js";
import type { CreateProjectData } from "./types.js";

export const getAllProjects = async () => {
  const projects = await prisma.project.findMany();
  return projects;
};

export const getProject = async (id: string) => {
  const project = await prisma.project.findUnique({
    where: {
      id,
    },
  });

  return project;
};

export const createProject = async (data: CreateProjectData) => {
  const project = await prisma.project.create({
    data: {
      name: data.name,
      description: data.description,
      visibility: data.visibility,
      stack: data.stack,
      userId: data.userId,

      endpoints: {
        create: data.endpoints.map((ep) => ({
          name: ep.name,
          description: ep.description,
          url: ep.url,
          method: ep.method,
          headers: ep.headers,
          body: ep.body,
          queryParams: ep.queryParams,
        })),
      },
    },

    include: {
      endpoints: true, // return endpoints also
    },
  });

  return project;
};
export const updateProject = async () => {

};
export const deleteProject = async (id : string) => {
 return await prisma.project.delete({
    where:{
      id
    }
  })
};
