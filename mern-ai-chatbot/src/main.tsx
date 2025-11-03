import React from "react"; // ✅ needed
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContect.tsx";
import { ThemeProvider, createTheme } from "@mui/material/styles"; // ✅ import

// ✅ Correct theme object
const theme = createTheme({
  typography: {
    fontFamily: "Roboto Slab, serif",
  },
});

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
