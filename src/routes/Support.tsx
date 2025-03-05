import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Paper, Typography, Container } from '@mui/material';

interface FormProps {
    onSubmit: (data: any) => void;
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
    const [description, setDescription] = React.useState('');
    const [files, setFiles] = React.useState<File[]>([]);

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFiles(event.target.files ? Array.from(event.target.files) : []);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit({ description, files });
    };

    return (
        <Paper
            component="form"
            sx={{
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                maxWidth: '600px',
                margin: '0 auto',
                borderRadius: 3,
                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                background: 'rgba(255, 255, 255, 0.9)',
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#1976d2' }}>
                Describe tu problema
            </Typography>
            <TextField
                id="outlined-multiline-static"
                label="Escribe los detalles..."
                sx={{ width: '100%', bgcolor: 'white', borderRadius: 1, color: '#010101' }}
                InputProps={{ style: { color: "#010101" } }}
                multiline
                rows={4}
                value={description}
                onChange={handleDescriptionChange}
            />
            <div style={{ marginTop: 20 }}></div>

            <label htmlFor="contained-button-file">
                <input accept="image/*" id="contained-button-file" multiple type="file" onChange={handleFileChange} hidden />
                <Button variant="outlined" component="span" startIcon={<AttachFileIcon />} sx={{ mt: 2, borderColor: '#1976d2', color: '#1976d2' }}>
                    Cargar archivo
                </Button>
            </label>

            <ul style={{ listStyle: 'none', padding: 0, marginTop: 10 }}>
                {files.map((file) => (
                    <li key={file.name} style={{ fontSize: '0.9rem', color: '#333' }}>{file.name}</li>
                ))}
            </ul>
            <Button type="submit" variant="contained" sx={{ mt: 3, backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>
                Enviar reporte
            </Button>
        </Paper>
    );
};

export default function Support() {
    const handleSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#1976d2' }}>
                Soporte Técnico
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, textAlign: 'center', color: 'white' }}>
                ¿Tienes alguna duda o problema? Déjanos tu mensaje y te ayudaremos lo antes posible.
            </Typography>
            <Form onSubmit={handleSubmit} />
        </Container>
    );
}
