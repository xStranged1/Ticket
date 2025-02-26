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
    const navigate = useNavigate();

    const handleCategoriesChange = (event: ChangeEvent<{ value: unknown }>) => {
        setSelectedCategory(event.target.value as Category);
    };

    const handlePrioridadChange = (event: ChangeEvent<{ value: unknown }>) => {
        setPrioridad(event.target.value as Priority);
    };

    useEffect(() => {

        const fetchCategories = async () => {
            const categories = await getAllCategories()
            if (categories) setCategories(categories) // TODO: Arreglar esto
            setCategories(dummyCategories)
        }
        fetchCategories()
    }, [])

    const handleSubmit = async () => {
        // validaciones
        if (!selectedCategory) return // show toast
        if (!prioridad) return

        const newTicket: BaseTicket = {
            subject: 'titulo',
            description: 'una desc',
            priority: matchPriority[prioridad] as PriorityBD,
            categoryId: selectedCategory.typeId,

            // TODO: COMPLETAR ESTO
            creatorId: 2,
            typeId: 3,
            assigneeId: 4,
            requirementsIds: [4, 2]
        }

        console.log("newTicket");
        console.log(newTicket);

        const res = await createTicket(newTicket)

        // MANEJAR RESPONSE
        if (!res) {
            //show toast fail
            return
        }
        // show toast success
        navigate(`/tickets`)
    }

    return (
        <Paper
            sx={{
                width: "auto",
                margin: "auto",
                mt: 5,
                p: 3,
                mb: 5,
                bgcolor: 'background.main',
                borderRadius: 2,
            }}
        >
            <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
                Crear Ticket #ID2012
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField label="Asunto" variant="outlined" fullWidth />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        label="Descripción"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                    />
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
                                <MenuItem key={category.typeId} value={category}>{category.description}</MenuItem>
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
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            border: "1px dashed gray",
                            p: 2,
                            borderRadius: 2,
                        }}
                    >
                        <Typography>Archivos adjuntos</Typography>
                        <IconButton color="primary" component="label">
                            <UploadFileIcon />
                            <input type="file" hidden />
                        </IconButton>
                    </Box>
                </Grid>

                <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Button variant="contained" color="error"
                        onClick={(event) => {
                            event.stopPropagation();
                            navigate(`/tickets`)
                        }}
                    >
                        Cancelar
                    </Button>
                    <Button variant="contained" color="success" onClick={handleSubmit}>
                        Confirmar
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

