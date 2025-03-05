import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Avatar,
    Grid,
    Divider,
    TextField,
    Button,
    Tooltip,
    Snackbar,
    Alert,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById, patchUser } from "../services/userService";
import { User } from "../types/types";

const UserProfile: React.FC = () => {

    let { id: idUser } = useParams();
    const id = Number(idUser)
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState<User>();
    const [openToastModify, setOpenToastModify] = useState(false);
    const [openToastError, setOpenToastError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const res = await getUserById(id)
            if (!res) {
                setOpenToastError(true)
                return
            }
            setProfile(res)
            console.log("res");
            console.log(res);
        }
        fetchUser()
    }, [])

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setProfile((prevProfile: any) => ({
            ...prevProfile,
            name: value
        }));
    };


    const handlePositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setProfile((prevProfile: any) => ({ ...prevProfile, position: value }));
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setProfile((prevProfile: any) => ({ ...prevProfile, email: value }));
    };

    const toggleEditMode = async () => {
        if (isEditing) {
            if (!profile) return
            console.log("profile enviado");
            console.log(profile);
            const res = await patchUser(id, profile)
            if (!res) {
                console.log('error');
                return
            }
            setOpenToastModify(true)
        }
        setIsEditing((prev) => !prev);
    };

    const handleCloseToast = () => {
        setOpenToastError(false)
        setOpenToastModify(false)
    }
    const handleCloseToastError = () => {
        setOpenToastError(false)
        navigate('/tickets')
    }


    return (
        <Box
            sx={{
                minHeight: "100vh",
                p: 3,
            }}
        >
            <Snackbar open={openToastModify} autoHideDuration={6000} onClose={handleCloseToast} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
                <Alert
                    onClose={handleCloseToast}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Se realizaron correctamente los cambios
                </Alert>
            </Snackbar>
            <Snackbar open={openToastError} autoHideDuration={6000} onClose={handleCloseToastError} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
                <Alert
                    onClose={handleCloseToastError}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    El usuario con id {id} no existe
                </Alert>
            </Snackbar>
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
                <Grid container spacing={3} sx={{ pt: 4 }}>

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
                                {profile?.username}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ fontStyle: "italic" }}
                            >
                                Departamento: {profile?.company}
                                <br />
                                Cargo: {profile?.position ?? "Desarrollador"}
                                <br />
                                Cuil: {profile?.cuil}
                            </Typography>
                        </Box>
                    </Grid>


                    <Grid item xs={12} md={8}>
                        <Box>
                            <TextField
                                label="Nombre"
                                variant="outlined"
                                name="name"
                                fullWidth
                                value={profile?.name || ""}
                                onChange={handleNameChange}
                                disabled={!isEditing}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="Cargo"
                                variant="outlined"
                                fullWidth
                                value={profile?.position || ""}
                                onChange={handlePositionChange}
                                disabled={!isEditing}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label='Email'
                                name='email'
                                variant="outlined"
                                fullWidth
                                value={profile?.email || ""}
                                onChange={handleEmailChange}
                                disabled={!isEditing}
                                sx={{ mb: 2 }}
                            />
                            <Divider sx={{ my: 2 }} />



                            <div style={{
                                display: 'flex', flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', gap: 10
                            }}>
                                <Button variant="contained" color="error"
                                    sx={{
                                        width: { xs: "100%" }
                                    }}
                                    style={{ width: 150 }}
                                    onClick={() => navigate(`/tickets`)}>Cancelar</Button>
                                <Button
                                    variant="contained"
                                    style={{ width: 150 }}
                                    color={isEditing ? "success" : "primary"}
                                    onClick={toggleEditMode}
                                >
                                    {isEditing ? "Guardar" : "Editar"}
                                </Button>
                            </div>

                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default UserProfile;
