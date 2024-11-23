import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Paper, Typography } from '@mui/material';

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
                p: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                maxWidth: '800px', // Límite de ancho
                margin: '0 auto',
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <TextField
                id="outlined-multiline-static"
                label="Describe lo sucedido..."
                sx={{
                    width: '100%',
                    '@media (min-width:600px)': {
                        width: '50ch',
                    },
                    '@media (min-width:900px)': {
                        width: '60ch',
                    },
                }}
                multiline
                rows={4}
                value={description}
                onChange={handleDescriptionChange}
            />
            <div style={{ marginTop: 30 }}></div>

            <label htmlFor="contained-button-file">
                <input accept="image/*" id="contained-button-file" multiple type="file" onChange={handleFileChange} hidden />
                <Button variant="contained" component="span" startIcon={<AttachFileIcon />}>
                    Cargar archivo
                </Button>
            </label>

            <ul>
                {files.map((file) => (
                    <li key={file.name}>{file.name}</li>
                ))}
            </ul>
            <Button type="submit" variant="contained" color='success'>
                Enviar reporte
            </Button>
        </Paper>
    );
};

export default function Support() {
    const handleSubmit = (data: any) => {
        console.log(data); // Aquí puedes manejar el envío del formulario
    };

    return (
        <Box
            sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '@media (min-width:600px)': {
                    p: 5,
                },
            }}
        >
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                ¿Tienes alguna duda o problema?
            </Typography>
            <Form onSubmit={handleSubmit} />
        </Box>
    );
}
