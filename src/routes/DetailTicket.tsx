import React, { useEffect, useState } from "react";
import {
    TextField, Typography, Button, Select, MenuItem, InputLabel, FormControl, Grid, IconButton, List, ListItem, ListItemText,
    Snackbar,
    Alert,
    SnackbarCloseReason,
    Paper,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Category, matchPriority, matchState, Ticket } from "../types/types";
import { format } from 'date-fns';
import { getTicketByID, UpdateTicket } from "../services/ticketService";
import { getAllCategories } from "../services/categoryService";
import { dummyCategories } from "../const/dummyData";
import { CommentSection } from "../components/CommentSection";
import { patchTicket } from "../services/ticketService";

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

    const handleConfirm = async () => {
        if (!formData) return;

        const updatedData: UpdateTicket = {
            subject: formData.subject,
            description: formData.description,
            priority: formData.priority
            // requirements: 
        };
        console.log("updatedData");
        console.log(updatedData);

        const success = await patchTicket(idTicket, updatedData);
        if (success) {
            setOpen(true);
            setIsEditing(false);
            setTimeout(() => {
                navigate('/tickets');
            }, 1600);
        } else {
            console.error("Error al actualizar el ticket");
        }
    };

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
        <>
            <Paper
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    width: "auto",
                    margin: "auto",
                    mt: 5,
                    p: 3,
                    mb: 5,
                    bgcolor: "background.main",
                    borderRadius: 2,
                }}
            >
                {/* Notificación Snackbar */}
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert
                        onClose={handleClose}
                        severity="success"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        Se realizaron correctamente los cambios
                    </Alert>
                </Snackbar>

                {/* Código del ticket */}
                <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }} gutterBottom>
                    {formData?.code || "Cargando..."}
                </Typography>

                {!formData ? (
                    <p>Loading...</p>
                ) : (
                    <Grid container spacing={2}>
                        {/* Asunto */}
                        <Grid item xs={12}>
                            <TextField
                                label="Asunto"
                                name="subject"
                                value={formData?.subject || ""}
                                onChange={handleChange}
                                fullWidth
                                disabled={!isEditing}
                            />
                        </Grid>

                        {/* Descripción */}
                        <Grid item xs={12}>
                            <TextField
                                label="Descripción"
                                name="description"
                                value={formData?.description || ""}
                                onChange={handleChange}
                                fullWidth
                                multiline
                                rows={4}
                                disabled={!isEditing}
                            />
                        </Grid>

                        {/* Usuario destinatario */}
                        <Grid item xs={12}>
                            <TextField
                                label="Usuario destinatario"
                                name="recipient"
                                value={formData?.recipient || ""}
                                onChange={handleChange}
                                fullWidth
                                disabled={!isEditing}
                            />
                        </Grid>

                        {/* Relacionados */}
                        <Grid item xs={12}>
                            <TextField
                                label="Relacionados"
                                name="related"
                                value={formData?.related || ""}
                                onChange={handleChange}
                                fullWidth
                                disabled={!isEditing}
                            />
                        </Grid>

                        {/* Categoría */}
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth disabled={!isEditing}>
                                <InputLabel>Categoría</InputLabel>
                                <Select
                                    name="category"
                                    value={formData?.category?.description || ""}
                                    onChange={handleChange}
                                >
                                    <MenuItem value={formData?.category?.description || ""}>
                                        {formData?.category?.description || "Seleccionar"}
                                    </MenuItem>
                                    {categories.map((category) => (
                                        <MenuItem key={category.id} value={category}>{category.description}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Prioridad */}
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth disabled={!isEditing}>
                                <InputLabel>Prioridad</InputLabel>
                                <Select
                                    name="priority"
                                    value={formData.priority ?? ""}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="URGENT">Muy alta</MenuItem>
                                    <MenuItem value="HIGH">Alta</MenuItem>
                                    <MenuItem value="MEDIUM">Media</MenuItem>
                                    <MenuItem value="LOW">Baja</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Fecha */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Fecha"
                                name="date"
                                type="date"
                                value={formData?.date || ""}
                                onChange={handleChange}
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                disabled={!isEditing}
                            />
                        </Grid>

                        {/* Hora */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Hora"
                                name="time"
                                type="time"
                                value={formData?.time || ""}
                                onChange={handleChange}
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                disabled={!isEditing}
                            />
                        </Grid>

                        {/* Estado */}
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth disabled={!isEditing}>
                                <InputLabel>Estado</InputLabel>
                                <Select
                                    name="status"
                                    value={matchState[formData?.state] || ""}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="Abierto">Abierto</MenuItem>
                                    <MenuItem value="Asignado">Asignado</MenuItem>
                                    <MenuItem value="Cerrado">Cerrado</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Comentario */}
                        <Grid item xs={12}>
                            <TextField
                                label="Comentario"
                                name="comment"
                                value={formData?.comment || ""}
                                onChange={handleChange}
                                fullWidth
                                multiline
                                rows={2}
                                disabled={!isEditing}
                            />
                        </Grid>

                        {/* Archivos Adjuntos */}
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
                                {(formData?.files || []).map((file, index) => (
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

                        {/* Botones */}
                        <Grid item xs={12} sm={3}>
                            <Button variant="contained" color="error" fullWidth onClick={() => navigate(`/tickets`)}>Volver</Button>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Button variant="outlined" fullWidth onClick={handleCancel} disabled={!isEditing}>Cancelar</Button>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Button type="submit" variant="contained" fullWidth disabled={!isEditing} onClick={handleConfirm}>Confirmar</Button>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Button variant="contained" color="success" fullWidth onClick={handleEdit} disabled={isEditing}>Editar</Button>
                        </Grid>
                    </Grid>
                )}
            </Paper>

            {/* Comentarios */}
            <Paper
                sx={{
                    width: "auto",
                    margin: "auto",
                    mt: 5,
                    p: 3,
                    mb: 5,
                    bgcolor: "background.main",
                    borderRadius: 2,
                }}
            >
                {!formData ? <p>Cargando comentarios...</p> : <CommentSection ticketId={idTicket} ticketState={formData.state} />}
            </Paper>
        </>
    );
}