import { prisma } from "../../lib/prisma.js"
import type { CreateProjectData } from "./types.js";

export const getAllProjects = async () => {
   const projects = await prisma.project.findMany();
   return projects;
}

export const getProject = async (id : string) => {
    const project = await prisma.project.findUnique({
        where:{
            id
        }
    })

    return project;
}

export const createProject = async (newData : CreateProjectData) => {
    const {name, description, visibility, stack, userId, endpoints} = newData
    const updatedProject = await prisma.project.create({
        data:{
            name,
            description,
            visibility,
            stack,
            userId,
            endpoints,
        }
    })
    return updateProject;
}

export const updateProject = async () => {
    
}
export const deleteProject = async () => {
    
}