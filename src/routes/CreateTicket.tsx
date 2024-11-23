import React from "react";
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
export default function CreateTicket() {


    const [categoria, setCategoria] = React.useState("");
    const [prioridad, setPrioridad] = React.useState("");

    const handleCategoriaChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setCategoria(event.target.value as string);
    };

    const handlePrioridadChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setPrioridad(event.target.value as string);
    };

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
                        <InputLabel id="categoria-label">Categoría</InputLabel>
                        <Select
                            labelId="categoria-label"
                            value={categoria}
                            onChange={handleCategoriaChange}
                            label="Categoría"
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
                    <Button variant="contained" color="error">
                        Cancelar
                    </Button>
                    <Button variant="contained" color="success">
                        Confirmar
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

