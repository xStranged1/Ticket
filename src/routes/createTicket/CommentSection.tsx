import { useEffect, useState } from "react"
import { Comment, State } from "../../types/types"
import { createComment, getCommentsByTicketId } from "../../services/commentService"
import { CardComment } from "./CardComment"
import { Button, Divider, TextField } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';

interface ParamsCommentSection {
    ticketState: State,
    ticketId: number,
}

export const CommentSection = ({ ticketState, ticketId }: ParamsCommentSection) => {

    const [comments, setComments] = useState<Comment[]>([])
    const [inputComment, setInputComment] = useState("")
    const [file, setFile] = useState<File>()

    useEffect(() => {
        const fetchComments = async () => {
            const res = await getCommentsByTicketId(ticketId)
            if (res == 400) return
            if (res) {
                setComments(res)
            }
        }
        fetchComments()
    })

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    const handleSendComment = async () => {
        if (!inputComment) return
        const newComment = {
            subject: inputComment,
            description: inputComment,
            requirementId: ticketId,
            userId: 1
        }

        const formData = new FormData()
        formData.append("comment", new Blob([JSON.stringify(newComment)], { type: "application/json" }));
        if (file) {
            formData.append('files', file);
        }
        const res = await createComment(formData)
        if (!res) {
            console.log('error');
            return
        }
        console.log(res);
    }

    return (
        <div>
            <h2 style={{ textAlign: 'left' }}>Comentarios</h2>
            {comments.map((comment, i) => {
                const isLastComment = i == comments.length - 1
                return (
                    <div>
                        <CardComment comment={comment} />
                        {!isLastComment && (<Divider />)}
                    </div>
                )
            })}

            {(ticketState == 'CLOSED') ? (
                <div>
                    <h3>El ticket esta cerrado, no se aceptarán mas comentarios</h3>
                </div>
            ) : (
                <div style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <TextField
                            label="Comentario"
                            name="comment"
                            value={inputComment}
                            onChange={(e) => setInputComment(e.target.value)}
                            fullWidth
                            multiline
                            rows={5}
                        />
                    </div>
                    <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between', gap: 10, alignItems: 'center', marginTop: 15 }}>
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={handleSendComment}
                            sx={{
                                backgroundColor: "#2196f3",
                                color: "white",
                                fontWeight: "bold",
                                "&:hover": { backgroundColor: "#1976d2" },
                            }}
                        >
                            Enviar
                        </Button>
                        <div style={{ paddingInline: 15 }}><SendIcon fontSize="large" color="secondary" /></div>
                        <input type="file" hidden onChange={handleFileChange} />
                    </div>

                </div>

            )}
        </div>
    )
}