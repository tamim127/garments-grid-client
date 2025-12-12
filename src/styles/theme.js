// src/styles/theme.js
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        mode: "light",
        primary: { main: "#0ea5e9" },
        secondary: { main: "#06b6d4" },
        success: { main: "#10b981" },
        error: { main: "#ef4444" },
        warning: { main: "#f59e0b" },
        background: { default: "#f8fafc", paper: "#ffffff" },
    },
    typography: { fontFamily: '"Inter", sans-serif' },
});