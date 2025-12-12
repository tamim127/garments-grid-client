// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import "./index.css";
import { router } from "./routes/router";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./styles/theme";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./contexts/AuthContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Toaster position="top-center" />
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
