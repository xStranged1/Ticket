import { ChangeEvent, useEffect, useState } from "react"
import { Comment, State } from "../types/types"
import { createComment, getCommentsByTicketId } from "../services/commentService"
import { CardComment } from "./CardComment"
import { Button, Divider, IconButton, TextField, Typography } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';
import voidPdf from '../assets/void.pdf'
import InputFileUpload from "./InputFileUpload"

interface ParamsCommentSection {
    ticketState: State,
    ticketId: number,
}

export const CommentSection = ({ ticketState, ticketId }: ParamsCommentSection) => {

    const [comments, setComments] = useState<Comment[]>([])
    const [inputComment, setInputComment] = useState("")
    const [inputSubject, setInputSubject] = useState("")

    const [files, setFiles] = useState<FileList>()

    useEffect(() => {
        const fetchComments = async () => {
            const res = await getCommentsByTicketId(ticketId)
            if (res == 400) return
            if (res) {
                setComments(res.content)
                console.log('comentarios');
                console.log(res);

            }
        }
        fetchComments()
    }, [])

    // const handleSendComment = async () => {
    //     if (!inputComment) return;

    //     const newTicket: BaseTicket = {
    //         subject: subject,
    //         description: description,
    //         priority: matchPriority[prioridad] as PriorityDB,
    //         categoryId: selectedCategory.id,
    //         typeId: selectedCategory.type.id,
    //         creatorId: 1,
    //     };

    //     const formData = new FormData();
    //     formData.append("requirement", new Blob([JSON.stringify(newTicket)], { type: "application/json" }));

    //     // if (files) {
    //     //     if (files.length > 0) {
    //     //         Array.from(files).forEach((file) => {
    //     //             formData.append('files', file);
    //     //         });
    //     //     }
    //     // } else {
    //         const voidFile = new File([voidPdf], 'void.pdf', { type: 'application/pdf' });
    //         formData.append('files', voidFile);
    //     // }

    //     try {
    //         const res = await createTicket(formData);
    //         if (!res) {
    //             console.error("Error al crear ticket");
    //             setOpenToastError(true)
    //             return;
    //         }
    //         console.log("res", res);
    //         setOpen(true);
    //         setTimeout(() => {
    //             navigate(`/tickets`);
    //         }, 1800);
    //     } catch (error) {
    //         console.error("Error al enviar ticket:", error);
    //     }
    // };



    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFiles(event.target.files);
        }
    };

    const handleSendComment = async () => {
        if (!inputComment || !inputSubject) return
        const newComment = {
            subject: inputSubject,
            description: inputComment,
            requirementId: ticketId,
            userId: 1
        }

        const formData = new FormData()
        formData.append("comment", new Blob([JSON.stringify(newComment)], { type: "application/json" }));

        if (files) {
            if (files.length > 0) {
                Array.from(files).forEach((file) => {
                    formData.append('files', file);
                });
            }
        } else {
            const voidFile = new File([voidPdf], 'void.pdf', { type: 'application/pdf' });
            formData.append('files', voidFile);
        }
        const res = await createComment(formData)
        if (!res) {
            console.log('error');
            return
        }
        setComments(prev => [...prev, res])
        setInputComment("")
        setInputSubject("")
        setFiles(undefined)
    }

    return (
        <div>
            <h2 style={{ textAlign: 'left' }}>Comentarios</h2>
            {comments.length == 0 && (
                <div style={{ paddingBlock: 60 }}>
                    <h3>Todavía no hay comentarios...</h3>
                </div>
            )}

            <div style={{ display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 20 }}>
                {comments.length > 0 && comments.map((comment, i) => {
                    const isLastComment = i == comments.length - 1
                    return (
                        <div style={{ width: "100%" }} key={comment.id}>
                            <CardComment comment={comment} />
                            {!isLastComment && (<div style={{ marginBlock: 20 }}> <Divider /></div>)}
                        </div>
                    )
                })}
            </div>

            {(ticketState == 'CLOSED') ? (
                <div>
                    <h3>El ticket esta cerrado, no se aceptarán mas comentarios</h3>
                </div>
            ) : (
                <div style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', marginTop: 120 }}>
                    <div>
                        <p style={{ textAlign: 'left' }}>Escribe un comentario!</p>
                        <TextField
                            label="Asunto"
                            name="comment"
                            fullWidth
                            value={inputSubject}
                            onChange={(e) => setInputSubject(e.target.value)}
                            rows={1}
                            style={{ marginBottom: 25 }}
                        />
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
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 10, alignItems: 'center' }}>
                            <Typography>Archivos adjuntos: {files?.length}</Typography>
                            <IconButton color="primary" component="label">
                                <InputFileUpload handleUploadFile={handleFileChange} text="Adjuntar archivos" />
                            </IconButton>
                        </div>
                        <Button style={{ paddingInline: 15 }}
                            onClick={handleSendComment}
                        >
                            <SendIcon fontSize="large" color="primary" />
                        </Button>
                        <input type="file" hidden onChange={handleFileChange} />
                    </div>

                </div>

            )}
        </div>
    )
}