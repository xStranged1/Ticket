import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Box,
    Typography,
    TextField,
    Button,
    IconButton,
    InputAdornment,
    Link,
    Fab,
    Paper,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

const loginSchema = z.object({
    email: z.string().email("Debe ser un email válido"),
    password: z
        .string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .regex(/[A-Z]/, "La contraseña debe incluir al menos una letra mayúscula")
        .regex(/[0-9]/, "La contraseña debe incluir al menos un número"),
});

const ExternalLogin: React.FC = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        try {
            loginSchema.parse(formData);
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
            console.log("Iniciar sesión con:", formData);
            console.log("Iniciar sesión con:", formData.email, formData.password);
            authService.login(formData.email, formData.password);
            navigate('/tickets')
        }
    };

    return (
        <Box
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100vh",
                backgroundImage: "url('/download.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Paper
                    sx={{
                        width: "100%",
                        maxWidth: "400px",
                        p: 4,
                        borderRadius: 2,
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                        background: "rgba(30, 30, 30, 0.85)",
                        color: "white",
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{ textAlign: "center", mb: 3, fontWeight: "bold" }}
                    >
                        Tickets
                    </Typography>

                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        name="email"
                        type="email"
                        placeholder="Ingresá tu email"
                        value={formData.email}
                        onChange={handleChange}
                        sx={{ mb: 2, bgcolor: "white", borderColor: "#2196f3" }}
                        error={!!errors.email}
                        helperText={errors.email}
                        InputProps={{ style: { color: "black" } }}
                        InputLabelProps={{ style: { color: "#9f9f9f" } }}
                    />

                    <TextField
                        label="Contraseña"
                        variant="outlined"
                        fullWidth
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Ingresá tu contraseña"
                        value={formData.password}
                        onChange={handleChange}
                        sx={{ mb: 2, bgcolor: "white", borderColor: "#2196f3" }}
                        error={!!errors.password}
                        helperText={errors.password}
                        InputProps={{
                            style: { color: "black" },
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleClickShowPassword} edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        InputLabelProps={{ style: { color: "#9f9f9f" } }}
                    />

                    <motion.div whileHover={{ scale: 1.05 }}>
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={handleLogin}
                            sx={{
                                backgroundColor: "#2196f3",
                                color: "white",
                                fontWeight: "bold",
                                "&:hover": { backgroundColor: "#1976d2" },
                            }}
                        >
                            Iniciar sesión
                        </Button>
                    </motion.div>

                    <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
                        <Link href="#" underline="none" color="white">
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </Typography>
                </Paper>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }}>
                <Fab
                    color="primary"
                    aria-label="Soporte"
                    onClick={() => (window.location.href = "/support")}
                    sx={{
                        bottom: 20,
                        right: 20,
                        backgroundColor: "#2196f3",
                        "&:hover": { backgroundColor: "#1976d2" },
                    }}
                >
                    <SupportAgentIcon />
                </Fab>
            </motion.div>
        </Box>
    );
};

export default ExternalLogin;
