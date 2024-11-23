import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
    colorSchemes: {
        dark: true,
    },
    palette: {
        mode: 'light',
        background: {
            default: '#fbfbfb', // Fondo blanco para el tema claro
        },
        secondary: {
            main: '#e7e7e7'
        }
    },
});

export const darkTheme = createTheme({
    colorSchemes: {
        dark: true,
    },
    palette: {
        mode: 'dark',
        background: {
            default: '#333333', // Fondo gris oscuro para el tema oscuro
        },
        primary: {
            main: '#3fb55d',
        },
        secondary: {
            main: '#f50057',
        },

    },
});