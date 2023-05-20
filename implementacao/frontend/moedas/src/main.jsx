import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { LoginProvider } from './context/LoginContext'

//* Rotas
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

//! User Router

//* Pages User
import Cadastro from './pages/cadastro/Cadastro.jsx'
import Perfil from './pages/perfil/Perfil.jsx'
import EnviarMoedas from './pages/enviar-moedas/EnviarMoedas.jsx'
import Extrato from './pages/extrato/Extrato.jsx'
import CadastroDeVantagens from './pages/empresa/CadastroDeVantagens.jsx'
import ListarVantagens from './pages/vantagens/ListarVantagens.jsx'

const userRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/cadastrar', element: <Cadastro /> },
      { path: '/perfil', element: <Perfil /> },
      { path: '/professor', element: <EnviarMoedas />},
      { path: '/extrato', element: <Extrato />},
      {path: '/cadastroVantagens', element: <CadastroDeVantagens />},
      {path: '/vantagens', element: <ListarVantagens />},
    ]
  }
])

//! Vantagem Router

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoginProvider>
      <RouterProvider router={ userRouter } />
    </LoginProvider>
  </React.StrictMode>,
)
