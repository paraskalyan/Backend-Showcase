import { API_ROUTES } from "@/constants/routes";
import apiClient from "@/lib/axios";


export const login = async (data: any) => {
    const response = await apiClient.post(API_ROUTES.LOGIN, data);
    return response;
}
export const signup = (data: any) => {
    const response = apiClient.post(API_ROUTES.SIGNUP, data);
    return response;

}