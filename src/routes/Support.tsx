import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AttachFileIcon from '@mui/icons-material/AttachFile';

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
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <TextField
                id="outlined-multiline-static"
                label="Describe lo sucedido..."
                multiline
                rows={4}
                value={description}
                onChange={handleDescriptionChange}
            />
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
            <Button type="submit" variant="contained">
                Enviar reporte
            </Button>
        </Box>
    );
};

export default function Support() {

    return (
        <>
            <Form />
        </>
    )
}