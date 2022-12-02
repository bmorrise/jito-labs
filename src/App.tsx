import "./App.css";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { Home } from "./pages";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
