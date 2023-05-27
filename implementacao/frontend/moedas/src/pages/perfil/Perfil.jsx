//* components
import Input from "../../components/inputs/Input";
import Form from "../../components/forms/Form";
import Select from "../../components/selects/Select";
import LinkedButton from "../../components/linked-buttons/LinkedButton";
import Button from "../../components/buttons/Button";
import { LoginContext } from "../../context/LoginContext";

//* react
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//* css
import "./Perfil.css";

const Perfil = () => {
  const url = "http://localhost:3000/api";

  const { user, updateUser, logout } = useContext(LoginContext);
  const navigate = useNavigate();

  const [userType, setUserType] = useState("");
  const [instituicoes, setInstituicoes] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [instituicao, setInstituicao] = useState();
  const [id, setId] = useState("");

  useEffect(() => {
    setId(user._id);
    setUserType(user.pessoa.tipo);

    if (user.pessoa.tipo !== "Empresa") {
      setInstituicao(user.instituicaoEnsino);
      setCursos(user.instituicaoEnsino.cursos);
      setDepartamentos(user.instituicaoEnsino.departamentos);
    }

    fetch(`${url}/instituicaoEnsino`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        throw response;
      })
      .then((data) => setInstituicoes(data));
  }, [navigate, user]);

  const handleChangeCourse = (selectedId) => {
    if (selectedId !== "0") {
      const instituicaoCursos = instituicoes.find(
        (instituicao) => instituicao._id === selectedId
      );
      setInstituicao(instituicaoCursos);
      setCursos(instituicaoCursos.cursos);
    } else setCursos([]);
  };

  const handleDeleteAccount = () => {
    fetch(`${url}/${userType}?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        alert(data.msg);

        logout();
        navigate("/cadastrar");
      })
      .catch((err) => {
        console.error(err);
        alert("Não foi possível apagar a conta.");
      });
  };

  const handleSubmit = (formData) => {
    if (!formData) {
      return;
    }

    const objectForm = Object.fromEntries(formData);

    fetch(`${url}/${userType.toLowerCase()}?id=${user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objectForm),
    })
      .then((resp) => resp.json())
      .then((data) => {
        alert(data.msg);
        console.log(data.response);
        updateUser(data.response);

        navigate("/perfil");
      })
      .catch((err) => {
        console.error(err);
        alert("Não foi possível editar a conta.");
      });
  };

  return (
    <div className="perfil-body">
      <section className="description-section">
        {userType === "Aluno" && (
          <>
            <div className="ponts">
              <span>moedas</span>
              <h1 className="ponts">{user.pessoa.carteira.saldo}</h1>
            </div>

            <div className="description">
              <h3 className="title-description">
                Você pode gastar seus pontos em <span>vantagens</span>
              </h3>
              <p className="description">
                Acumule e gaste pontos em vantagens como desconto em
                restaurantes da universidade, desconto de mensalidade ou compra
                de materiais específicos
              </p>

              <div className="hud-btn">
                <LinkedButton
                  type="button"
                  id="btn-vantagem"
                  className="yellow"
                  to="/"
                >
                  Ver Vantagens
                </LinkedButton>
                <LinkedButton
                  type="button"
                  id="btn-extrato"
                  className="black"
                  to="/"
                >
                  Ver extrato
                </LinkedButton>
              </div>
            </div>
          </>
        )}
        {userType === "Empresa" && (
          <>
            <section className="title-section">
              <div className="title">
                <h1 className="title">
                  Meus dados<span>.</span>
                </h1>
              </div>
            </section>
          </>
        )}
      </section>

      <section className={`form-section-${user.pessoa.tipo}`}>
        <Form onSubmit={handleSubmit}>
          <div className="inputs-form">
            <div className="edit-login">
              <Input
                type="text"
                name="nome"
                id="name"
                initialValue={user.pessoa.nome}
                label={
                  userType === "Empresa" ? "Nome da Empresa" : "Nome completo"
                }
                disabled
              />
              <Input
                type="email"
                name="email"
                id="email"
                initialValue={user.pessoa.email}
                label="Email"
                required
              />
              <Input
                type="password"
                name="senha"
                id="senha"
                initialValue={user.pessoa.senha}
                label="Senha"
                required
              />
            </div>

            {userType === "Aluno" ? (
              <div className="infos-aluno">
                <div className="cpf-rg">
                  <Input
                    type="text"
                    name="cpf"
                    id="cpf"
                    initialValue={user.cpf}
                    label="CPF"
                    disabled
                  />
                  <Input
                    type="text"
                    name="rg"
                    id="rg"
                    initialValue={user.rg}
                    label="RG"
                    disabled
                  />
                </div>

                <Input
                  type="text"
                  name="endereco"
                  id="endereco"
                  initialValue={user.endereco}
                  label="Endereço"
                  required
                />

                <div className="instituicao-curso flex column-gap-2rem">
                  <Select
                    name="instituicaoEnsino"
                    id="instituicaoEnsino"
                    label="Instituição"
                    initialValue={instituicao._id}
                    options={instituicoes}
                    onChange={handleChangeCourse}
                    required
                  />
                  <Select
                    name="curso"
                    id="curso"
                    label="Curso"
                    options={cursos}
                    initialValue={user.curso}
                    required
                  />
                </div>
              </div>
            ) : (
              userType === "Professor" && (
                <div className="infos-professor">
                  <div className="cpf-rg">
                    <Input
                      type="text"
                      name="cpf"
                      id="cpf"
                      initialValue={user.cpf}
                      label="CPF"
                      disabled
                    />
                    <Input
                      type="text"
                      name="rg"
                      id="rg"
                      initialValue={user.rg}
                      label="RG"
                      disabled
                    />
                  </div>

                  <Select
                    name="departamento"
                    id="departamento"
                    label="Departamento"
                    initialValue={user.departamento}
                    options={departamentos}
                    required
                  />

                  <div className="instituicao-departamento flex column-gap-2rem">
                    <Select
                      name="instituicaoEnsino"
                      id="instituicaoEnsino"
                      label="Instituição"
                      initialValue={instituicao._id}
                      options={instituicoes}
                      onChange={handleChangeCourse}
                      required
                    />
                    <Select
                      name="curso"
                      id="curso"
                      label="Curso"
                      options={cursos}
                      initialValue={user.curso}
                      required
                    />
                  </div>
                </div>
              )
            )}
          </div>

          <div className="button-submit">
            <Button
              type="button"
              className="delete"
              id="delete"
              onClick={handleDeleteAccount}
            >
              Apagar Perfil
            </Button>
            <Button type="submit" className="submit" id="submit">
              Editar
            </Button>
          </div>
        </Form>
      </section>
    </div>
  );
};

export default Perfil;
