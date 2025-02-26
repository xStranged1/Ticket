import {
    Box,
    TextField,
    Typography,
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Grid,
    IconButton,
    Paper,
    Snackbar,
    Alert,
} from "@mui/material";

import UploadFileIcon from "@mui/icons-material/UploadFile";
import { createTicket } from "../services/ticketService";
import { BaseTicket, Category, matchPriority, Priority, PriorityBD } from "../types/types";
import { getAllCategories } from "../services/categoryService";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyCategories } from "../const/dummyData";

export default function CreateTicket() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category | "">("");
    const [prioridad, setPrioridad] = useState<Priority | "">("");
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    const navigate = useNavigate();

    const handleCategoriesChange = (event: ChangeEvent<{ value: unknown }>) => {
        setSelectedCategory(event.target.value as Category);
    };

    const handlePrioridadChange = (event: ChangeEvent<{ value: unknown }>) => {
        setPrioridad(event.target.value as Priority);
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categories = await getAllCategories();
                if (categories) {
                    setCategories(categories);
                } else {
                    setCategories(dummyCategories);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
                setCategories(dummyCategories);
            }
        };
        fetchCategories();
    }, []);

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const handleSubmit = async () => {
        if (!selectedCategory || !prioridad) return;

        const newTicket: BaseTicket = {
            subject: "Título de ejemplo",
            description: "Descripción de ejemplo",
            priority: matchPriority[prioridad] as PriorityBD,
            categoryId: selectedCategory.id,
            creatorId: 2,
            //assigneeId: 4,
            // requirements: [], // TODO: AGREGAR TICKETS RELACIONADOS
        };

        console.log("newTicket", newTicket);

        try {
            const res = await createTicket(newTicket);
            if (!res) {
                console.error("Error al crear ticket");
                // return;
            }
            console.log("res");
            console.log(res);
            setOpen(true);
            setTimeout(() => {
                navigate(`/tickets`);
            }, 1800);
        } catch (error) {
            console.error("Error al enviar ticket:", error);
        }
    };

    return (
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
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: "100%" }}>
                    ¡El ticket se creó con éxito!
                </Alert>
            </Snackbar>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
                Crear Ticket #ID2012
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField label="Asunto" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Descripción" variant="outlined" fullWidth multiline rows={4} />
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Usuario destinatario" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Relacionados" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel id="categories-label">Categoría</InputLabel>
                        <Select
                            labelId="categories-label"
                            value={selectedCategory ?? ''}
                            onChange={handleCategoriesChange}
                            label="Categoría"
                        >
                            {categories.map((category) => (
                                <MenuItem key={category.id} value={category}>{category.description}</MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel id="prioridad-label">Prioridad</InputLabel>
                        <Select
                            labelId="prioridad-label"
                            value={prioridad}
                            onChange={handlePrioridadChange}
                            label="Prioridad"

                        >
                            <MenuItem value="Baja">Urgente</MenuItem>
                            <MenuItem value="Alta">Alta</MenuItem>
                            <MenuItem value="Media">Media</MenuItem>
                            <MenuItem value="Baja">Baja</MenuItem>

                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px dashed gray", p: 2, borderRadius: 2 }}>
                        <Typography>Archivos adjuntos: {file ? file.name : "Ninguno"}</Typography>
                        <IconButton color="primary" component="label">
                            <UploadFileIcon />
                            <input type="file" hidden onChange={handleFileChange} />
                        </IconButton>
                    </Box>
                </Grid>
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Button variant="contained" color="error" onClick={() => navigate(`/tickets`)}>Cancelar</Button>
                    <Button variant="contained" color="success" onClick={handleSubmit}>Confirmar</Button>
                </Grid>
            </Grid>
        </Paper>
    );
}
