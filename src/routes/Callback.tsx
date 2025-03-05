import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

export default function Callback() {
    const navigate = useNavigate();

    useEffect(() => {
        async function processAuth() {
            await authService.handleAuthentication();
            navigate('/tickets');
        }
        processAuth();
    }, [navigate]);

    return <div>Procesando autenticación...</div>;
}