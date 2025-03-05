import { User } from "../types/types";
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

export const getAllUsers = async () => {
    try {
        const response = await axiosClient.get(`user-sv/api/v1/outside-users/active`);
        if (response.status == 200) return response.data;
        return false
    } catch (error: any) {
        console.log("error");
        console.log(error);
        return false
    }
}

export const patchUser = async (id: number, updatedFields: User) => {
    try {
        const response = await axiosClient.put(`/user-sv/api/v1/outside-users/${id}`, updatedFields);
        if (response.status === 200) {
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error actualizando el ticket:', error);
        return false;
    }
};
