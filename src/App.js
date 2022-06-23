import React from "react";
import Notes from "./pages/Notes";
import { ThemeProvider, createTheme } from "@mui/material";

import "./style/app.css";
export default function App() {
  const theme = createTheme({
    palette: { mode: "dark" },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <Notes />
      </div>
    </ThemeProvider>
  );
}