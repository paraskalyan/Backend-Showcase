import { API_ROUTES } from "@/constants/routes"
import apiClient from "@/lib/axios"

export const getAllProjects = async () =>{
   const response = await apiClient.get(API_ROUTES.PROJECTS);
   return response.data.data;
}