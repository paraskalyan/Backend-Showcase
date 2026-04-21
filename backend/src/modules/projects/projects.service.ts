import { prisma } from "../../lib/prisma.js"

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

export const createProject = async () => {
    
}

export const updateProject = async () => {
    
}
export const deleteProject = async () => {
    
}