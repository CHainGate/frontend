import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: '#00001C',
        },
        secondary: {
            main: '#FFFFFF',
        },
        error: {
            main: red.A400,
        },
    },
});

export default theme;