import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { store } from "./app/store.js";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import ThemeModeProvider from "./theme/ThemeModeProvider .jsx";
import {Toaster} from "react-hot-toast"
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <LocalizationProvider dateAdapter={AdapterDayjs}>

      <Provider store={store}>
        <ThemeModeProvider>
          <App />
          <Toaster />
        </ThemeModeProvider>
      </Provider>
      </LocalizationProvider>
    </BrowserRouter>
  </StrictMode>,
);
