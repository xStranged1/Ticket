import React, { useState } from "react";
import {
    Box, TextField, Typography, Button, Select, MenuItem, InputLabel, FormControl, Grid, IconButton, List, ListItem, ListItemText,
    Snackbar,
    Alert,
    SnackbarCloseReason,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Ticket } from "../types/types";
import { format } from 'date-fns';

interface TicketFormProps {
    onSubmit: (formData: {
        subject: string;
        description: string;
        recipient: string;
        related: string;
        files: File[];
        category: string;
        priority: string;
        date: string;
        time: string;
        status: string;
        comment: string;
    }) => void;
}

export const DetailTicket: React.FC<TicketFormProps> = ({ onSubmit }) => {

    const { id } = useParams();
    const location = useLocation();
    const { ticket }: { ticket: Ticket } = location.state || {}; // Accediendo al objeto
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const formatedDate = format(ticket.date, 'dd/MM/yyyy')
    const [formData, setFormData] = React.useState({
        id,
        subject: ticket.subject,
        description: ticket.description,
        recipient: ticket.assigneeId,
        related: '',
        files: [] as File[],
        category: ticket.categoryId,
        priority: ticket.priority,
        date: formatedDate,
        time: '15:30',
        status: 'Iniciado',
        comment: 'Tiempo limite 3 semanas',
    });

    const formatedId = id?.toString().padStart(3, '0');
    let [searchParams] = useSearchParams();
    const editing = searchParams.get('editing')
    const initialIsEditing = editing === 'true';
    const [isEditing, setIsEditing] = React.useState(initialIsEditing);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name as string]: value });
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFormData({
                ...formData,
                files: [...formData.files, ...Array.from(event.target.files)],
            });
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(formData);
        setIsEditing(false);
    };

    const handleDeleteFile = (index: number) => {
        setFormData({
            ...formData,
            files: formData.files.filter((_, i) => i !== index),
        });
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleConfirm = () => {
        setOpen(true);
        setTimeout(() => {
            navigate('/tickets')
        }, 1600);
    }

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 3, marginTop: 5, border: '1px solid #ccc', borderRadius: 2 }}>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Se realizaron correctamente los cambios
                </Alert>
            </Snackbar>

            <Typography variant="h6" gutterBottom>
                Ticket #C{formatedId}
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Asunto"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        fullWidth
                        disabled={!isEditing}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Descripción"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={4}
                        disabled={!isEditing}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Usuario destinatario"
                        name="recipient"
                        value={formData.recipient}
                        onChange={handleChange}
                        fullWidth
                        disabled={!isEditing}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Relacionados"
                        name="related"
                        value={formData.related}
                        onChange={handleChange}
                        fullWidth
                        disabled={!isEditing}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth disabled={!isEditing}>
                        <InputLabel>Categoría</InputLabel>
                        <Select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                        >
                            <MenuItem value="Environment">Environment</MenuItem>
                            <MenuItem value="Hardware">Hardware</MenuItem>
                            <MenuItem value="Deployment">Deployment</MenuItem>
                            <MenuItem value="Desing">Deployment</MenuItem>
                            <MenuItem value="Development">Deployment</MenuItem>
                            <MenuItem value="devOps">Deployment</MenuItem>
                            <MenuItem value="Conectivity">Deployment</MenuItem>
                            <MenuItem value="Network">Deployment</MenuItem>

                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth disabled={!isEditing}>
                        <InputLabel>Prioridad</InputLabel>
                        <Select
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                        >
                            <MenuItem value="Baja">Urgente</MenuItem>
                            <MenuItem value="Alta">Alta</MenuItem>
                            <MenuItem value="Media">Media</MenuItem>
                            <MenuItem value="Baja">Baja</MenuItem>

                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Fecha"
                        name="date"
                        type="date"
                        value={formatedDate}
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        disabled={!isEditing}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Hora"
                        name="time"
                        type="time"
                        value={formData.time}
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        disabled={!isEditing}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth disabled={!isEditing}>
                        <InputLabel>Estado</InputLabel>
                        <Select
                            name="status"
                            label={formData.status}
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <MenuItem value="abierto">Abierto</MenuItem>
                            <MenuItem value="en_proceso">En proceso</MenuItem>
                            <MenuItem value="cerrado">Cerrado</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Comentario"
                        name="comment"
                        value={formData.comment}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={2}
                        disabled={!isEditing}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        component="label"
                        startIcon={<UploadFileIcon />}
                        disabled={!isEditing}
                    >
                        Subir archivos
                        <input
                            type="file"
                            multiple
                            hidden
                            onChange={handleFileChange}
                        />
                    </Button>
                    <List>
                        {formData.files.map((file, index) => (
                            <ListItem
                                key={index}
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteFile(index)} disabled={!isEditing}>
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemText primary={file.name} />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Button variant="outlined" fullWidth onClick={handleCancel} disabled={!isEditing}>Cancelar</Button>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Button type="submit" variant="contained" fullWidth disabled={!isEditing} onClick={handleConfirm}>Confirmar</Button>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Button variant="contained" color="success" fullWidth onClick={handleEdit} disabled={isEditing}>Editar</Button>
                </Grid>
            </Grid>
        </Box >
    );
};