import { Category } from "../types/types";
import { axiosClient } from "./apiService";

export const getAllCategories = async (): Promise<Category[] | false> => {
    try {
        const response = await axiosClient.get(`/type-sv/api/categories`);
        if (response.status == 200) return response.data;
        return false
    } catch (error: any) {
        console.log(error);
        return false
    }
}
