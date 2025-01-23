import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light', // Switch to light mode for a brighter appearance
    primary: {
      main: '#1976d2', // A soft blue color for primary buttons and accents
    },
    secondary: {
      main: '#ff4081', // Optional secondary color for accents
    },
    background: {
      default: '#f5f5f5', // Light gray background for the app
      paper: '#ffffff', // White for cards and paper elements
    },
    text: {
      primary: '#212121', // Dark gray for main text
      secondary: '#757575', // Lighter gray for secondary text
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    fontSize: 14,
    h4: {
      fontWeight: 600,
      fontSize: '1.8rem',
    },
    body1: {
      color: '#424242', // Ensure readable text
    },
  },
  shape: {
    borderRadius: 12, // Rounded corners for a modern look
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Prevent uppercase buttons
          borderRadius: '8px', // Rounded buttons
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Soft shadow for floating effect
        },
      },
    },
  },
});

export default theme;
