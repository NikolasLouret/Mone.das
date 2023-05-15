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
const _id = '123'

const userRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/cadastrar', element: <Cadastro /> },
      { path: '/perfil', element: <Perfil /> },
      { path: '/professor', element: <EnviarMoedas />},
      { path: '/extrato', element: <Extrato />},
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
