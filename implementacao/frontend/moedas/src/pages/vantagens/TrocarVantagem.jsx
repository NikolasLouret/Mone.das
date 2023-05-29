import React from "react";

import { useContext, useEffect, useState } from "react";

import styles from "./TrocarVantagem.module.css";

import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

import { GiTwoCoins } from "react-icons/gi";

import Button from "../../components/buttons/Button";
import CardVantagem from "./components/cards/CardVantagem";
import { useParams, useNavigate } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

const TrocarVantagem = () => {
  const { user } = useContext(LoginContext);
  const [vantagens, setVantagens] = useState([]);
  const [vantagem, setVantagem] = useState({});
  const [trocaVantagem, setTrocaVantagem] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false)
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/vantagens", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        const filteredVantagens = data.filter(
          (vantagem) => vantagem._id !== id
        );
        setVantagens(filteredVantagens);
      });
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/vantagem/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setVantagem(data);
        setTrocaVantagem(false);
      });
  }, [id, trocaVantagem]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return
    }

    setSuccessMessage(false)
  }

  function handleTrocaClick() {
    fetch(`http://localhost:3000/api/carteira/transacao`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "origem": user.pessoa._id,
        "destino": vantagem.empresa.pessoa._id,
        "descricao": "Resgate de vantagem",
        "valor": vantagem.preco,
      }),
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setSuccessMessage(true)
      }).catch(err => console.log(err))
  }

  function handleCardClick(e) {
    navigate(`/trocarVantagem/${e}`);
    setTrocaVantagem(true);
  }

  return (
    <div className={styles.body}>
      <div className={styles.vantagem}>
        <div className={styles.divImg}>
          <img src={`http://localhost:3000/files/${vantagem.foto}`} alt="" />
        </div>
        <div className={styles.data}>
          <div className={styles.name}>
            <h2>{vantagem.nome}</h2>
            <p>
              {vantagem.empresa &&
                vantagem.empresa.pessoa &&
                vantagem.empresa.pessoa.nome}
            </p>
          </div>
          <div className={styles.preco}>
            <h1>
              {vantagem.preco} <GiTwoCoins size="2rem" color="#FFC700" />
            </h1>
          </div>
          <div className={styles.descricao}>
            <p>{vantagem.descricao}</p>
          </div>
          {user.pessoa.tipo === "Aluno" && (
            <div className={styles.buttonTrocar}>
              <Button className="yellow" onClick={handleTrocaClick}>Trocar por vantagem</Button>
            </div>
          )}
        </div>
      </div>
      {vantagens.length > 1 && (
        <div className={styles.outrasVantagens}>
          <h3>
            Outras vantagens<span className={styles.ponto}>.</span>
          </h3>
          <section className="cards flex flex-wrap column-gap-3rem row-gap-3rem">
            {vantagens.map((vantagem) => (
              <CardVantagem
                content={vantagem}
                onClick={handleCardClick}
                className={styles.card}
                key={vantagem._id}
              />
            ))}
          </section>
        </div>
      )}
      <Snackbar open={successMessage} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
            Vantagem trocada com sucesso!
        </Alert>
      </Snackbar>
    </div>
    
  );
};

export default TrocarVantagem;
