import { API_URL } from "../const/config";
import { PriorityDB, Ticket, User } from "../types/types";
import { axiosClient } from "./apiService";
import Cookies from 'js-cookie';

export const createTicket = async (ticket: FormData): Promise<Ticket | false> => {
    try {
        const token = Cookies.get('accessToken')
        const response = await fetch(`${API_URL}/requirement-sv/api/requirements`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: ticket
        });

        if (!response.ok) {
            return false
        }

        const result = await response.json();
        return result
    } catch (error) {
        console.error('Error creando ticket:', error);
        return false
    }

}

export const getTickets = async () => {
    try {
        const response = await axiosClient.get("/requirement-sv/api/requirements");
        if (response.status == 200) return response.data;
        return false
    } catch (error: any) {
        console.log("error");
        console.log(error);
        return false
    }
}

export const getTicketByID = async (id: number): Promise<Ticket | false | 400> => {
    try {
        const response = await axiosClient.get(`/requirement-sv/api/requirements/${id}`, {
            headers: {
                "content-type": "application/json", // Minúsculas
                "ngrok-skip-browser-warning": "1"
            }
        });
        if (response.status == 200) return response.data;
        if (response.status == 400) return 400 // ticket not found
        return false
    } catch (error: any) {
        console.log("error");
        console.log(error);
        return false
    }
}

export const deleteTicket = async (id: number) => {
    try {
        const response = await axiosClient.delete(`/requirement-sv/api/requirements/${id}`);
        console.log("response");
        console.log(response);
        if (response.status == 200) return true;
        if (response.status == 204) return true;
        if (response.status == 202) return true;
        return false
    } catch (error: any) {
        console.log("error");
        return false
    }
}

export const patchTicket = async (id: number, updatedFields: User) => {
    try {
        const response = await axiosClient.patch(`/requirement-sv/api/requirements/${id}`, updatedFields);
        if (response.status === 200 || response.status === 204) {
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error actualizando el ticket:', error);
        return false;
    }
};
