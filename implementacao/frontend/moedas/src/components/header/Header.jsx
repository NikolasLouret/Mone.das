import { Link } from 'react-router-dom'

import { LoginContext } from '../../context/LoginContext'
import { useContext } from 'react'

import './Header.css'

const Header = () => {
    const { currentUser, logoutUser } = useContext(LoginContext)

    return (
        <nav className="header">
            <ul className="list-itens">
                <div className="section-1">
                    <li>
                        <Link to="/"><img className="logo" src="public/logo_v1.svg" alt="mone.das" /></Link>
                    </li>

                    { currentUser && 
                        <div className="itens-header">
                            { currentUser.userType === "aluno" &&
                                <>
                                    <li>
                                        <Link to="/">Ver Vantagens</Link>
                                    </li>
                                    <li>
                                        <Link to="/">Ver extrato</Link>
                                    </li>
                                </>
                            }

                            { currentUser.userType === "professor" &&
                                <>
                                    <li>
                                        <Link to="/">Ver extrato</Link>
                                    </li>
                                    <li>
                                        <Link to="/">Distribuir moedas</Link>
                                    </li>
                                </>
                            }

                            { currentUser.userType === "empresa" &&
                                <>
                                    <li>
                                        <Link to="/">Cadastrar Vantagens</Link>
                                    </li>
                                    <li>
                                        <Link to="/">Editar Vantagens</Link>
                                    </li>
                                </>
                            }

                        </div>
                    }
                </div>

                <div className="section-2">
                    { currentUser ?
                        <div className="subsection-2">
                           <li>
                                <Link to="/" onClick={ logoutUser }>Logout</Link>
                            </li>
                            <li>
                                <Link to="/perfil">Perfil</Link>
                            </li>
                        </div>
                        :
                        <div className="subsection-2">
                            <li>
                                <Link to="/cadastrar">Cadatrar</Link>
                            </li>
                            <li>
                                <Link to="/login">Entrar</Link>
                            </li>
                        </div>
                    }
                </div>
            </ul>
        </nav>
    )
}

export default Header