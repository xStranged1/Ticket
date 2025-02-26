import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
    colorSchemes: {
        dark: false,
    },
    palette: {
        mode: 'light',
        background: {
            default: '#fbfbfb', // Fondo blanco para el tema claro
            paper: "#fff"
        },
        secondary: {
            main: '#e7e7e7'
        },
        text: {
            primary: '#010101',
            secondary: '#222',
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
            default: '#2f2f2f', // Fondo gris oscuro para el tema oscuro
            paper: "#383838"
        },
        primary: {
            main: '#3fb55d',
        },
        secondary: {
            main: '#f50057',
        },
        text: {
            primary: '#fff',
            secondary: '#dedede',
        }

    },
});