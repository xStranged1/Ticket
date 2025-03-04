import React, { useEffect, useState } from "react";
import {
    Box, TextField, Typography, Button, Select, MenuItem, InputLabel, FormControl, Grid, IconButton, List, ListItem, ListItemText,
    Snackbar,
    Alert,
    SnackbarCloseReason,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Category, matchPriority, matchState, Ticket } from "../types/types";
import { format } from 'date-fns';
import { getTicketByID } from "../services/ticketService";
import { getAllCategories } from "../services/categoryService";
import { dummyCategories } from "../const/dummyData";

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

    const navigate = useNavigate();
    const { idTicket: idString } = useParams();
    const idTicket = Number(idString)
    if (!idTicket) {
        navigate('/tickets')
        return
    }

    const location = useLocation();
    const { ticket }: { ticket: Ticket } = location.state || {}; // Accediendo al objeto
    const [open, setOpen] = useState(false);

    const [formData, setFormData] = React.useState<Ticket | undefined>();
    const [categories, setCategories] = React.useState<Category[]>([]);

    const formatedId = idTicket?.toString().padStart(3, '0');
    let [searchParams] = useSearchParams();
    const editing = searchParams.get('editing')
    const initialIsEditing = editing === 'true';
    const [isEditing, setIsEditing] = React.useState(initialIsEditing);

    useEffect(() => {
        const fetchCategories = async () => {
            const categories = await getAllCategories();
            if (!categories) {
                setCategories(dummyCategories)
                return
            }
            setCategories(categories);
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchTicket = async () => {
            const res = await getTicketByID(idTicket)
            if (!res) {
                navigate('/tickets')
                return
            }
            if (res == 400) {
                console.log('No existe');
                return
            }
            console.log("res");
            console.log(res);
            setFormData(res)
        }

        fetchTicket()

    }, [])


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

            {!formData
                ? (<div><p>Loading</p></div>)
                :
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
                    <Grid item xs={12} sx={{ borderColor: "primary.contrastText" }}>
                        <TextField
                            sx={{ borderColor: "primary.contrastText" }}
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
                                value={formData.category.description}
                                label="Categoria"
                                onChange={handleChange}
                            >
                                <MenuItem value={formData.category.description}>{formData.category.description}</MenuItem>

                                {(categories.length > 0) && (
                                    categories.map((category) => {
                                        if (category.id != formData.category.id) {
                                            return (
                                                <MenuItem key={category.id} value={category}>{category.description}</MenuItem>
                                            )
                                        }
                                    }))}

                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth disabled={!isEditing}>
                            <InputLabel>Prioridad</InputLabel>
                            <Select
                                name="priority"
                                value={Object.keys(matchPriority).find(key => matchPriority[key] === formData.priority)}
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
                                label="Estado"
                                value={matchState[formData.state]}
                                onChange={handleChange}
                            >
                                <MenuItem value="Abierto">Abierto</MenuItem>
                                <MenuItem value="Asignado">Asignado</MenuItem>
                                <MenuItem value="Cerrado">Cerrado</MenuItem>
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
                    <Grid item xs={12} sm={4}>
                        <Button variant="contained" color="error" onClick={() => navigate(`/tickets`)}>Volver</Button>
                    </Grid>
                </Grid>
            }
        </Box >
    );
};