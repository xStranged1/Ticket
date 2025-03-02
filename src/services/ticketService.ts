import axios from "axios";
import { BaseTicket, Ticket } from "../types/types";
import { API_URL } from "../const/config";

export const createTicket = async (ticket: BaseTicket): Promise<Ticket | false> => {
    try {
        const response = await axios.post(`${API_URL}/requirement-sv/api/requirements`, ticket);
        if (response.status == 201) return response.data;
        return false
    } catch (error: any) {
        console.log(error);
        return false
    }
}

export const getTickets = async () => {
    try {
        const response = await axios.get(`${API_URL}/requirement-sv/api/requirements`);
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
        const response = await axios.get(`${API_URL}/requirement-sv/api/requirements/${id}`, {
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
        const response = await axios.delete(`${API_URL}/requirement-sv/api/requirements/${id}`);
        console.log("response");
        console.log(response);
        if (response.status == 200) return true;
        if (response.status == 204) return true;
        if (response.status == 202) return true;
        return false
    } catch (error: any) {
        console.log("error");
        console.log(error);
        return false
    }
}