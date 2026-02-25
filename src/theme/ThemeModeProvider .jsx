import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const ThemeModeContext = createContext();

const ThemeModeProvider = ({ children }) => {
  const [mode, setMode] = useState(localStorage.getItem("themeMode") || "light");

  // Ensure mode is synced with localStorage
  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  // Toggle function
  const toggleTheme = () => setMode((prev) => (prev === "light" ? "dark" : "light"));

  // Custom theme palette
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
              background: {
                default: "rgba(250, 250, 250, 0.8)", 
                paper: "rgba(255, 255, 255, 0.85)", 
              },

              text: { primary: "#1a1a1a" },
            }
            : {
              background: {

                default: "rgba(0,0,0,1)", 
                paper: "#121212",
              },
              text: { primary: "#f5f5f5" },
            }),
        },
      }),
    [mode]
  );

  return (
    <ThemeModeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
        {children}
        </CssBaseline>
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export const useThemeMode = () => useContext(ThemeModeContext);
export default ThemeModeProvider;
