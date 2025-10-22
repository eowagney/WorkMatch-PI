import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import InicioPage from "./pages/InicioPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import CadastroPage from "./pages/CadastroPage.jsx";
import ProfissionalDetalhes from "./pages/ProfissionalDetalhes.jsx";
import HomePage from "./pages/HomePages.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/inicio" replace />} />
        <Route path="/inicio" element={<InicioPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />
        <Route path="/home" element={< HomePage/>} />
        <Route path="/profissional/:id" element={<ProfissionalDetalhes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
