import React from "react";
import {
    Box, TextField, Typography, Button, Select, MenuItem, InputLabel, FormControl, Grid, IconButton, List, ListItem, ListItemText,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSearchParams } from "react-router-dom";

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

    const [formData, setFormData] = React.useState({
        subject: '',
        description: '',
        recipient: '',
        related: '',
        files: [] as File[],
        category: '',
        priority: '',
        date: '',
        time: '',
        status: '',
        comment: '',
    });

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

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 3, border: '1px solid #ccc', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
                Crear Ticket #ID2012
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
                        value={formData.date}
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
                    <Button type="submit" variant="contained" fullWidth disabled={!isEditing}>Confirmar</Button>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Button variant="contained" color="success" fullWidth onClick={handleEdit} disabled={isEditing}>Editar</Button>
                </Grid>
            </Grid>
        </Box >
    );
};