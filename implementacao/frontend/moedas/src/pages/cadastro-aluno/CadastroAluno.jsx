//* Components
import Input from "../../components/inputs/Input"
import Select from "../../components/selects/Select"
import Form from "../../components/forms/Form"
import { useEffect, useState } from 'react';

//* CSS
import './CadastroAluno.css'

const CadastroAluno = () => {
    const url = "http://localhost:3000/api"
    const [instituicoes, setInstituicoes] = useState([])
    const [cursos, setCursos] = useState([])

    useEffect(() => {
        fetch(`${url}/instituicaoEnsino`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(response => { 
            if(response.ok) {
                return response.json()
            }

            throw response
        })
        .then(data => setInstituicoes(data))
    }, [])

    const handleSubmit = form => {
        if(!form) {
            return
        }

        fetch(`${url}/aluno`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form)
        })
        .then(resp => resp.json())
        .then(data => alert(data.msg))
        .catch(err => alert("Não foi possível criar a conta. Erro: " + err))
    }

    const handleChangeCourse = (selectedId) => {

        if(selectedId !== "0") {
            const instituicaoCursos = instituicoes.find(instituicao => instituicao._id === selectedId)
            setCursos(instituicaoCursos.cursos)
        } else
            setCursos([])
    }

    return (
        <div className="cadastrar-aluno-body">
            <section className="title-section">
                <div className="title">
                    <h5 className="subtitle">CADASTRE AQUI</h5>
                    <h1 className="title">Crie uma nova conta<span>.</span></h1>
                    <p className="login">Já possui uma conta? <a href="" className="login-page">Login</a></p>
                </div>
            </section>

            <section className="form-section">
                <Form className="form-register-aluno" textButton="Criar conta" onSubmit={ handleSubmit }>
                    <Input type="text" name="nome" id="name" label="Nome completo" required/>
                    <Input type="email" name="email" id="email" label="Email" required/>
                    <Input type="password" name="senha" id="senha" label="Senha" required/>

                    <div className="cpf-rg">
                        <Input type="text" name="cpf" id="cpf" label="CPF" required/>
                        <Input type="text" name="rg" id="rg" label="RG" required/>
                    </div>

                    <Input type="text" name="endereco" id="endereco" label="Endereço" required/>
                    <div className="instituicao-curso">
                        <Select name="instituicaoEnsino" id="instituicaoEnsino" label="Instituição" objectOptions={ instituicoes } onChange={ handleChangeCourse } required/>
                        <Select name="curso" id="curso" label="Curso" options={ cursos } required/>
                    </div>
                </Form>
            </section>
        </div>
    )
}

export default CadastroAluno