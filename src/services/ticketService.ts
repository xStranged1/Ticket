import axios from "axios";
import { BaseTicket, Ticket } from "../types/types";
import { API_URL } from "../const/config";

export const createTicket = async (ticket: BaseTicket): Promise<Ticket | false> => {
    try {
        const response = await axios.post(`${API_URL}/requirements-sv/api/requirements`, ticket);
        if (response.status == 201) return response.data;
        return false
    } catch (error: any) {
        console.log(error);
        return false
    }
}

export const getTickets = async (): Promise<Ticket[] | false> => {
    try {
        const response = await axios.get(`${API_URL}/requirement-sv/api/requirements`, {
            headers: { "ngrok-skip-browser-warning": "69420", "Access-Control-Allow-Origin": "*" }
        });
        console.log("response");
        console.log(response);

        if (response.status == 200) return response.data;
        return false
    } catch (error: any) {
        console.log("error");
        console.log(error);
        return false
    }
}