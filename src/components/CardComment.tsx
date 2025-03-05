import { Card, CardContent, IconButton, Typography } from "@mui/material"
import { Comment } from "../types/types"
import InputFileUpload from "./InputFileUpload"

export const CardComment = ({ comment }: { comment: Comment }) => {

    const downloadFiles = () => {
        console.log('download en construccion');
    }

    return (
        <div>
            <div>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent sx={{ textAlign: 'left' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                                Usuario {comment.id}
                            </Typography>
                            <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>08/05/2025</Typography>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h5" component="div">
                                Asunto: <span style={{ fontStyle: "italic" }}>"{comment.subject}"</span>
                            </Typography>
                            {comment.files?.length > 1 && (
                                <>
                                    <Typography>Archivos adjuntos: {comment.files?.length - 1}</Typography>
                                    <IconButton color="primary" component="label">
                                        <InputFileUpload handleUploadFile={downloadFiles} text="Descargar" download />
                                    </IconButton>
                                </>
                            )}
                        </div>

                        <Typography variant="body2">
                            {comment.description}
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}