// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline, Box, IconButton } from "@mui/material";
import Home from "./components/Home";
import UserDetail from "./components/UserDetail";
import NotFound from "./components/NotFound";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "./redux/themeSlice"; // Import the action

const App = () => {
  // Get darkMode state from Redux store
  const darkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();

  // Define the theme based on darkMode
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#90caf9" : "#1976d2",
      },
      background: {
        default: darkMode ? "#121212" : "#f5f5f5",
        paper: darkMode ? "#1e1e1e" : "#ffffff",
      },
      text: {
        primary: darkMode ? "#ffffff" : "#000000",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {/* Dark Mode Toggle Button */}
        <Box
          sx={{
            position: "fixed",
            top: 16,
            right: 16,
            zIndex: 9999,
            backgroundColor: theme.palette.background.paper,
            boxShadow: 3,
            borderRadius: "50%",
          }}
        >
          <IconButton onClick={() => dispatch(toggleDarkMode())} color="inherit">
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:id" element={<UserDetail />} />
          <Route path="*" element={<NotFound />} /> {/* Handle unknown routes */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
