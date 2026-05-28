import { API_ROUTES } from "@/constants/routes";
import apiClient from "@/lib/axios";

export const runEndpoint = async (id: string) =>{
   const response = await apiClient.post(API_ROUTES.EXECUTION, {
    endpointId: id
   });
   return response.data;
}