import { Comment } from "../types/types";
import { axiosClient } from "./apiService";

export const getCommentsByTicketId = async (id: number): Promise<Comment[] | false | 400> => {

    try {
        const response = await axiosClient.get(`/comment-sv/api/comments/requirement/${id}`);
        if (response.status == 200) return response.data;
        if (response.status == 400) return 400 // ticket not found
        return false
    } catch (error: any) {
        console.log("error");
        console.log(error);
        return false
    }
}


export const createComment = async (formData: FormData) => {

    try {
        const res = await axiosClient.post('/comment-sv/api/comments', formData)
        if (res.status == 201) {
            return res.data
        }
        return false
    } catch (error) {
        console.log("error");
        console.log(error);
        return false
    }
}
