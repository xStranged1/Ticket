import { axiosClient } from "./apiService";

export const getUserById = async (id: number) => {
    try {
        const response = await axiosClient.get(`user-sv/api/v1/outside-users/${id}`);
        if (response.status == 200) return response.data;
        return false
    } catch (error: any) {
        console.log("error");
        console.log(error);
        return false
    }
}