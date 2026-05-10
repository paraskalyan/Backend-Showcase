import { API_ROUTES } from "@/constants/routes"
import apiClient from "@/lib/axios"


export const getDashboardStats = async ()=>{
   const response = await apiClient.get(API_ROUTES.DASHBOARD);
   return response.data.data;
}