import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import CadastroAluno from "./pages/cadastro-aluno/CadastroAluno";
import CadastroEmpresa from "./pages/CadastroEmpresa";
import Perfil from "./pages/Perfil"

// CSS
import './App.css'

function App() {

  return (
      <BrowserRouter>
      <Routes>
          <Route exact path="/cadastro-aluno" element={<CadastroAluno/>} />
          <Route exact path="/cadastro-empresa" element={<CadastroEmpresa/>} />
          <Route exact path="/perfil" element={<Perfil/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
