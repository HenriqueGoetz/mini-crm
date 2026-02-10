import { CssBaseline } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.tsx";

function App() {
  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
