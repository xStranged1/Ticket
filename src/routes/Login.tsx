import React, { useState } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    IconButton,
    InputAdornment,
    Link,
    Fab,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { z } from "zod";


const loginSchema = z.object({
    email: z.string().email("Debe ser un email válido"),
    password: z
        .string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .regex(/[A-Z]/, "La contraseña debe incluir al menos una letra mayúscula")
        .regex(/[0-9]/, "La contraseña debe incluir al menos un número"),
});

const ExternalLogin: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string }>(
        {}
    );


    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };


    const validateForm = () => {
        try {
            loginSchema.parse({ email, password });
            setErrors({});
            return true;
        } catch (e) {
            if (e instanceof z.ZodError) {
                const fieldErrors: { [key: string]: string } = {};
                e.errors.forEach((error) => {
                    const field = error.path[0] as string;
                    fieldErrors[field] = error.message;
                });
                setErrors(fieldErrors);
            }
            return false;
        }
    };

    const handleLogin = () => {
        if (validateForm()) {
            console.log("Iniciar sesión con:", { email, password });

        }
    };


    const handleSupportRedirect = () => {
        window.location.href = "/support";
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                backgroundColor: "#f5f5f5",
                position: "relative",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "400px",
                    backgroundColor: "white",
                    p: 4,
                    borderRadius: 2,
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        textAlign: "center",
                        mb: 3,
                        fontWeight: "bold",
                        color: "#333",
                    }}
                >
                    Iniciar Sesión
                </Typography>


                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    type="email"
                    placeholder="Ingresá tu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ mb: 2 }}
                    error={!!errors.email}
                    helperText={errors.email}
                />


                <TextField
                    label="Contraseña"
                    variant="outlined"
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    placeholder="Ingresá tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ mb: 2 }}
                    error={!!errors.password}
                    helperText={errors.password}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />


                <Button
                    variant="contained"
                    fullWidth
                    onClick={handleLogin}
                    sx={{
                        backgroundColor: "#4caf50",
                        color: "white",
                        fontWeight: "bold",
                        "&:hover": {
                            backgroundColor: "#45a049",
                        },
                    }}
                >
                    Iniciar sesión
                </Button>


                <Typography
                    variant="body2"
                    sx={{
                        mt: 2,
                        textAlign: "center",
                        color: "#333",
                    }}
                >
                    <Link href="#" underline="none">
                        ¿Olvidaste tu contraseña?
                    </Link>
                </Typography>
            </Box>


            <Fab
                color="primary"
                aria-label="Soporte"
                onClick={handleSupportRedirect}
                sx={{
                    position: "absolute",
                    bottom: 20,
                    right: 20,
                    backgroundColor: "#2196f3",
                    "&:hover": {
                        backgroundColor: "#1976d2",
                    },
                }}
            >
                <SupportAgentIcon />
            </Fab>
        </Box>
    );
};

export default ExternalLogin;
