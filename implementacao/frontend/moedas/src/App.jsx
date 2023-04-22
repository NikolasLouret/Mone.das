import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Cadastro from "./pages/cadastro/Cadastro";
import Perfil from "./pages/Perfil"

// CSS
import './App.css'

function App() {

  return (
      <BrowserRouter>
      <Routes>
          <Route exact path="/cadastrar" element={<Cadastro/>} />
          <Route exact path="/perfil" element={<Perfil/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
