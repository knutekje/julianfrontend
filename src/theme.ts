// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2', // Soft blue
    },
    secondary: {
      main: '#d32f2f', // Soft red
    },
    background: {
      default: '#1e1e2d', // Dark gray
      paper: '#2e2e3d', // Slightly lighter gray
    },
    text: {
      primary: '#ffffff', // White text
      secondary: '#b0b0b0', // Subtle gray text
    },
  },
  typography: {
    fontFamily: 'Roboto, Inter, Arial, sans-serif',
    fontSize: 14,
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none', // No uppercase for buttons
    },
  },
  shape: {
    borderRadius: 8, // Rounded corners
  },
});

export default theme;
