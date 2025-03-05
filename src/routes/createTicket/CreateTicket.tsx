import { Box, TextField, Typography, Button, Select, MenuItem, InputLabel, FormControl, Grid, IconButton, Paper, Snackbar, Alert, SnackbarCloseReason } from "@mui/material";
import { createTicket } from "../../services/ticketService";
import { BaseTicket, Category, matchPriority, Priority, PriorityDB, User } from "../../types/types";
import { getAllCategories } from "../../services/categoryService";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyCategories } from "../../const/dummyData";
import voidPdf from '../../assets/void.pdf';
import InputFileUpload from "../../components/InputFileUpload";
import { getAllUsers } from "../../services/userService";

export default function CreateTicket() {

    const [categories, setCategories] = useState<Category[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category | "">("");
    const [selectedUser, setSelectedUser] = useState<User | "">("");
    const [prioridad, setPrioridad] = useState<Priority | "">("");
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    const [open, setOpen] = useState(false);
    const [openToastError, setOpenToastError] = useState(false);
    const [files, setFiles] = useState<FileList>();

    const navigate = useNavigate();

    const handleCategoriesChange = (event: ChangeEvent<{ value: unknown }>) => {
        setSelectedCategory(event.target.value as Category);
    };

    const handleUserChange = (event: ChangeEvent<{ value: unknown }>) => {
        setSelectedUser(event.target.value as User);
    };

    const handlePrioridadChange = (event: ChangeEvent<{ value: unknown }>) => {
        setPrioridad(event.target.value as Priority);
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFiles(event.target.files);
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


    useEffect(() => {
        const fetchUsers = async () => {
            const users = await getAllUsers();
            if (users) {
                setUsers(users.content);
                return
            }
        };
        fetchUsers();
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

    const handleCloseError = (
        event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenToastError(false);
    };

    const handleSubmit = async () => {
        if (!selectedCategory || !prioridad) return;

        const newTicket: BaseTicket = {
            subject: subject,
            description: description,
            priority: matchPriority[prioridad] as PriorityDB,
            categoryId: selectedCategory.id,
            typeId: selectedCategory.type.id,
            creatorId: 1,
        };

        const formData = new FormData();
        formData.append("requirement", new Blob([JSON.stringify(newTicket)], { type: "application/json" }));

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

        try {
            const res = await createTicket(formData);
            if (!res) {
                console.error("Error al crear ticket");
                setOpenToastError(true)
                return;
            }
            console.log("res", res);
            setOpen(true);
            setTimeout(() => {
                navigate(`/tickets`);
            }, 1800);
        } catch (error) {
            console.error("Error al enviar ticket:", error);
        }
    };

    return (
        <>

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
                <Snackbar open={openToastError} autoHideDuration={6000} onClose={handleCloseError} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                    <Alert onClose={handleCloseError} severity="error" variant="filled" sx={{ width: "100%" }}>
                        Hubo un error creando el ticket
                    </Alert>
                </Snackbar>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
                    Crear Nuevo Ticket
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField label="Asunto" variant="outlined" fullWidth
                            onChange={(text) => { setSubject(text.target.value) }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Descripción" variant="outlined" fullWidth multiline rows={4}
                            onChange={(text) => { setDescription(text.target.value) }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="users-label">Usuarios</InputLabel>
                            <Select
                                labelId="users-label"
                                value={selectedUser ?? ''}
                                onChange={handleUserChange}
                                label="Usuario"
                            >
                                {users.map((user) => (
                                    <MenuItem key={user.id} value={user}>{user.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
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
                                <MenuItem value="Muy alta">Muy alta</MenuItem>
                                <MenuItem value="Alta">Alta</MenuItem>
                                <MenuItem value="Media">Media</MenuItem>
                                <MenuItem value="Baja">Baja</MenuItem>

                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px dashed gray", p: 2, borderRadius: 2 }}>
                            <Typography>Archivos adjuntos: {files?.length}</Typography>
                            <IconButton color="primary" component="label">
                                <InputFileUpload handleUploadFile={handleFileChange} />
                            </IconButton>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Button variant="contained" color="error" onClick={() => navigate(`/tickets`)}>Cancelar</Button>
                        <Button variant="contained" color="success" onClick={handleSubmit}>Confirmar</Button>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
}
