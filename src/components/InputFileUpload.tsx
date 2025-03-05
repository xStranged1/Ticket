import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function InputFileUpload({ handleUploadFile }: { handleUploadFile: any }) {

    return (
        <Button
            component="label"
            color='info'
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
        >
            Subir archivos
            <VisuallyHiddenInput
                type="file"
                onChange={handleUploadFile}
                multiple
                maxLength={5}
            />
        </Button>
    );
}
