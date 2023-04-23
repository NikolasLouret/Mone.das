//* components
import Input from "../../components/inputs/Input"
import Form from "../../components/forms/Form"
import Select from "../../components/selects/Select"
import LinkedButton from "../../components/linked-buttons/LinkedButton"
import Button from '../../components/buttons/Button'
import { LoginContext } from "../../context/LoginContext"

//* react
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"

//* css
import './Perfil.css'

const Perfil = () => {
    const url = "http://localhost:3000/api"

    const { currentUser, loginUser, logoutUser } = useContext(LoginContext)
    const navigate = useNavigate()

    const [userType, setUserType] = useState("")
    const [instituicoes, setInstituicoes] = useState([])
    const [cursos, setCursos] = useState([])
    const [instituicao, setInstituicao] = useState(currentUser.instituicaoEnsino)
    const [id, setId] = useState("")

    useEffect(() => {
        if(!currentUser) {
            navigate("/login")
            return
        }

        setId(currentUser._id)
        setUserType(currentUser.userType)

        fetch(`${url}/instituicaoEnsino`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then(response => { 
            if(response.ok) {
                return response.json()
            }

            throw response
        }).then(data => setInstituicoes(data))
    }, [])

    const handleChangeCourse = selectedId => {
        if(selectedId !== "0") {
            const instituicaoCursos = instituicoes.find(instituicao => instituicao._id === selectedId)
            setCursos(instituicaoCursos.cursos)
        } else
            setCursos([])
    }

    const handleDeleteAccount = () => {
        fetch(`${url}/${userType}?id=${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(resp => resp.json())
        .then(data => {
            alert(data.msg)

            logoutUser()
            navigate('/cadastrar')
        })
        .catch(err => {
            console.error(err)
            alert("Não foi possível apagar a conta.")
        })
    }

    const handleSubmit = formData => {
        if(!formData) {
            return
        }

        const objectForm = Object.fromEntries(formData)

        fetch(`${ url }/${ userType }?id=${ currentUser._id }`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(objectForm)
        })
        .then(resp => resp.json())
        .then(data => {
            alert(data.msg)

            data.response.userType = userType
            loginUser(data.response)

            navigate('/perfil')
        })
        .catch(err => {
            console.error(err)
            alert("Não foi possível editar a conta.")
        })
    }

    return (
        <div className="perfil-body">
            <section className="description-section">
                { userType === "aluno" &&
                    <>
                        <div className="ponts">
                            <span>pontos</span>
                            <h1 className="ponts">{ currentUser.carteira.saldo }</h1>
                        </div>

                        <div className="description">
                            <h3 className="title-description">Você pode gastar seus pontos em <span>vantagens</span></h3>
                            <p className="description">Acumule e gaste pontos em vantagens como desconto em restaurantes da universidade, desconto de mensalidade ou compra de materiais específicos</p>
                            
                            <div className="hud-btn">
                                <LinkedButton type="button" id="btn-vantagem" className="yellow" to="/">Ver Vantagens</LinkedButton>
                                <LinkedButton type="button" id="btn-extrato" className="black" to="/">Ver extrato</LinkedButton>
                            </div>
                        </div>
                    </>
                }
                { userType === "empresa" &&
                    <>
                        <section className="title-section">
                            <div className="title">
                                <h1 className="title">Meus dados<span>.</span></h1>
                            </div>
                        </section>
                    </>
                }
            </section>

            <section className={ `form-section-${ currentUser.userType }` }>
                <Form className="form-edit" textButton="Editar" onSubmit={ handleSubmit } to="/">
                    <div className="inputs-form">    
                        <div className="edit-login">    
                            <Input type="text" name="nome" id="name" initialValue={ currentUser.nome } label={userType === "aluno" ? "Nome completo" : "Nome da Empresa"} disabled/>
                            <Input type="email" name="email" id="email" initialValue={ currentUser.email } label="Email" required/>
                            <Input type="password" name="senha" id="senha" initialValue={ currentUser.senha } label="Senha" required/>
                        </div>

                        { userType === "aluno" &&
                            <div className="infos-aluno">
                                <div className="cpf-rg">
                                    <Input type="text" name="cpf" id="cpf" initialValue={ currentUser.cpf } label="CPF" disabled/>
                                    <Input type="text" name="rg" id="rg" initialValue={ currentUser.rg } label="RG" disabled/>
                                </div>

                                <Input type="text" name="endereco" id="endereco" initialValue={ currentUser.endereco } label="Endereço" required/>

                                <div className="instituicao-curso">
                                    <Select name="instituicaoEnsino" id="instituicaoEnsino" label="Instituição" initialValue={ instituicao.nome } options={ instituicoes } onChange={ handleChangeCourse } required/>
                                    <Select name="curso" id="curso" label="Curso" options={ cursos } initialValue={ currentUser.curso } required/>
                                </div>
                            </div>
                        }
                    </div>

                    <div className="button-submit">
                        <Button type="button" className="delete" id="delete" onClick={ handleDeleteAccount }>Apagar Perfil</Button>
                        <Button type="submit" className="submit" id="submit">Editar</Button>
                    </div>
                </Form>

            </section>
        </div>
    )
}

export default Perfil