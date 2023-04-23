import { Outlet } from "react-router-dom"

//* Header
import Header from "./components/header/Header"

//* CSS
import './App.css'

function App() {
  return (
    <div className="App">
        <Header />
        <Outlet />
    </div>
  )
}

export default App
