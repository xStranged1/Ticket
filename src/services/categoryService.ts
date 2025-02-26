import axios from "axios";
import { API_URL } from "../const/config";
import { Category } from "../types/types";

export const getAllCategories = async (): Promise<Category[] | false> => {
    try {
        const response = await axios.get(`${API_URL}/type-sv/api/categories`);
        if (response.status == 200) return response.data;
        return false
    } catch (error: any) {
        console.log(error);
        return false
    }
}
