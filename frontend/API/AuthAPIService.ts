import { API_ROUTES } from "@/constants/routes";
import apiClient from "@/lib/axios";


export const login = (data: any) => apiClient.post(API_ROUTES.LOGIN, data);
export const signup = (data: any) => apiClient.post(API_ROUTES.SIGNUP, data);