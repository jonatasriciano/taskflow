import { createTheme } from "@mui/material/styles";

// Create a custom Material-UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#546e7a", // A soft grayish-blue for primary actions
      light: "#819ca9", // Lighter version of primary for highlights
      dark: "#29434e", // Darker version for emphasis
    },
    secondary: {
      main: "#ff80ab", // Pale pink for secondary actions
      light: "#ffb2dd", // Lighter shade for highlights
      dark: "#c94f7c", // Darker shade for contrasts
    },
    info: {
      main: "#64b5f6", // Light blue for informational messages
      light: "#9be7ff", // Softer blue for backgrounds or highlights
      dark: "#2286c3", // Darker blue for emphasis
    },
    success: {
      main: "#81c784", // Light green for success indications
      light: "#b2fab4", // Softer green for subtle success messages
      dark: "#519657", // Stronger green for emphasis
    },
    warning: {
      main: "#ffb74d", // Light orange for warnings
      light: "#ffe97d", // Softer orange for backgrounds
      dark: "#c88719", // Stronger orange for contrasts
    },
    error: {
      main: "#e57373", // Soft red for errors
      light: "#ffa4a2", // Lighter red for highlights
      dark: "#af4448", // Stronger red for emphasis
    },
    background: {
      default: "#f9fafc", // Off-white background to reduce the "foggy" feel
      paper: "#ffffff", // Solid white background for components like cards
    },
    text: {
      primary: "#37474f", // Dark gray for primary text
      secondary: "#607d8b", // Lighter grayish-blue for secondary text
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', 'Arial', sans-serif", // Clean and modern font stack
    h1: {
      fontSize: "2.2rem", // Size for main headings
      fontWeight: 600, // Bold weight for emphasis
      color: "#37474f", // Dark gray to contrast with the background
    },
    h2: {
      fontSize: "1.8rem", // Size for secondary headings
      fontWeight: 500, // Slightly lighter than h1
      color: "#37474f", // Consistent dark gray
    },
    body1: {
      fontSize: "1rem", // Standard body text size
      color: "#455a64", // Darker blue-gray for better readability
    },
    body2: {
      fontSize: "0.875rem", // Slightly smaller text for secondary content
      color: "#607d8b", // Lighter blue-gray for less prominent text
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)", // Soft shadow for a modern look
          borderRadius: "8px", // Subtle rounding for smooth edges
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // Prevent all-uppercase text
          borderRadius: "6px", // Slightly rounded buttons for a friendly look
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontSize: "0.75rem", // Smaller text size for compact chips
          borderRadius: "4px", // Rounded corners for a soft appearance
        },
      },
    },
  },
});

export default theme; // Export the theme for use across the application