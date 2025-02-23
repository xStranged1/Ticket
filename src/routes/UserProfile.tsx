import React, { useState } from "react";
import {
    Box,
    Typography,
    Avatar,
    Grid,
    Divider,
    TextField,
    Button,
    Tooltip,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useParams } from "react-router-dom";

const UserProfile: React.FC = () => {

    let { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        id,
        nombre: "Romeo",
        apellido: "Monfroglio",
        email: "romeokai@gmail.com",
    });


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
    };


    const toggleEditMode = () => {
        setIsEditing((prev) => !prev);
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                p: 3,
            }}
        >
            <Box
                sx={{
                    maxWidth: "800px",
                    margin: "auto",
                    p: 3,
                    bgcolor: 'background.paper',
                    boxShadow: 3,
                    borderRadius: 2,
                }}
            >
                <Typography variant="h4" sx={{ mb: 4 }}>
                    Perfil
                </Typography>
                <Grid container spacing={3}>

                    <Grid item xs={12} md={4}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                textAlign: "center",
                                borderRadius: 2,
                                p: 3,
                                bgcolor: 'background.default',
                                position: "relative",
                            }}
                        >

                            <Tooltip title="Romeokai es usuario destacado" arrow>
                                <StarIcon
                                    sx={{
                                        color: "gold",
                                        position: "absolute",
                                        top: "10px",
                                        left: "10px",
                                    }}
                                />
                            </Tooltip>
                            <Avatar
                                sx={{
                                    width: "100px",
                                    height: "100px",
                                    mb: 2,
                                    backgroundColor: "#ddd",
                                }}
                            />
                            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                Romeokai
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ fontStyle: "italic" }}
                            >
                                Departamento: XXXXXXXX
                                <br />
                                Cargo: XXXXXXXX
                                <br />
                                Legajo: 99999
                            </Typography>
                        </Box>
                    </Grid>


                    <Grid item xs={12} md={8}>
                        <Box>
                            <TextField
                                label="Nombre"
                                variant="outlined"
                                fullWidth
                                value={profile.nombre}
                                name="nombre"
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="Apellido"
                                variant="outlined"
                                fullWidth
                                value={profile.apellido}
                                name="apellido"
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                value={profile.email}
                                name="email"
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                sx={{ mb: 2 }}
                            />
                            <Divider sx={{ my: 2 }} />
                            <Button
                                variant="contained"
                                color={isEditing ? "success" : "primary"}
                                onClick={toggleEditMode}
                            >
                                {isEditing ? "Guardar" : "Editar"}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default UserProfile;
