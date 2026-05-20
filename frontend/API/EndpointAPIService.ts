import { API_ROUTES } from "@/constants/routes";
import apiClient from "@/lib/axios";

export const createEndpoint = async (data: any)=>{
   const response = await apiClient.post(API_ROUTES.ENDPOINT, data);
   return response.data.data;
}

export const getEndpoints = async (id: string)=> {
    const response = await apiClient.get(`${API_ROUTES.ENDPOINT}?projectId=${id}`);
    return response.data;
}