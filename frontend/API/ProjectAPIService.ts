import { API_ROUTES } from "@/constants/routes"
import { Project } from "@/constants/types";
import apiClient from "@/lib/axios"

export const getAllProjects = async () =>{
   const response = await apiClient.get(API_ROUTES.PROJECTS);
   return response.data.data;
}

export const createProject = async (data: Project)=>{
   const response = await apiClient.post(API_ROUTES.PROJECTS, data)
}

export const getProject = async (id: string)=>{
   const response = await apiClient.get(`${API_ROUTES.PROJECTS}/${id}`);
   return response.data.data;
}