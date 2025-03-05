import { Comment } from "../../types/types"

export const CardComment = ({ comment }: { comment: Comment }) => {

    return (
        <div>
            <h3>Asunto: <span style={{ fontStyle: "italic" }}>"{comment.subject}"</span></h3>
            <h3>{comment.comment}</h3>
            <h3>{comment.userId}</h3>
        </div>
    )
}