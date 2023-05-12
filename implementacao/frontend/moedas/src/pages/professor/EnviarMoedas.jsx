import React, { useState } from 'react'
import styles from './EnviarMoedas.module.css'
import Input from '../../components/inputs/Input'
import Button from '../../components/buttons/Button'

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
 

const EnviarMoedas = () => {
    var [aluno,setAluno] = useState({});
    const [valor, setValor] = useState(0);
    const [openMessage, setOpenMessage] = useState(false);
    const [openErrorMessage, setOpenErrorMessage] = useState(false);

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
          return;
      }

      setOpenMessage(false)
      setOpenErrorMessage(false)
    };

    function handleKeyDown(event) {
      if (event.keyCode === 189 || event.keyCode === 109) { 
        event.preventDefault(); 
        setValor(0); 
      }
    }

    function handleChange(event) {
      setValor(event.target.value);
    }

    function handleSubmit(e){
        e.preventDefault()
        var email = document.getElementById("inputMatricula").value;
        var moedas = document.getElementById("inputMoedas").value;
        var mensagem = document.getElementById("inputMensagem").value;

        if(!email || !moedas || !mensagem){
          setOpenErrorMessage(true)
          return
        }

        fetch(`http://localhost:3000/api/aluno/email/${email}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(resp => resp.json())
          .then(data => {
            setAluno(data);
            if (data && data.pessoa) {
              fetch(`http://localhost:3000/api/carteira/transacao`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  "descricao": mensagem,
                  "idDestinatario": data.pessoa._id,
                  "idRemetente": "645e7836283a50729d368153",
                  "valor": parseInt(moedas)
                })
              })
              .then(resp => resp.json())
              .then(setOpenMessage(true))
              .catch(err => console.error(err));
            }
          })
          .catch(err => console.error(err));
    }

  return (
    <div className={styles.parent}>
        <div className={styles.leftScreen}>
            <div>
                <h1 className={styles.title}>Enviar moedas</h1>
                <span className={styles.ponto}>.</span>
            </div>
            <div>
                <p className={styles.subtitle}>Envie moedas para seus alunos como forma de reconhecimento por bom comportamento, participação nas aulas, etc.</p>
            </div>
            <div className={styles.inputParent}>
                <div className={styles.input}>
                    <Input type="text" name="Email" label="Email" id="inputMatricula" />
                </div>
                <div className={styles.inputInformations}>          
                    <p>Nome: </p>
                    <p>Matrícula: </p>
                </div>
            </div>
            <div className={styles.inputParent}>
                <div className={styles.input}>
                    <Input type="number" name="Moedas" label="Moedas" id="inputMoedas" onChange={handleChange} onKeyDown={handleKeyDown} min="1"/>
                </div>
                <div className={styles.inputInformations}>          
                    <p>Saldo atual: </p>
                    <p>Saldo final: </p>
                </div>
            </div>
            <div>
                <Input type="text" className={styles.inputMensagem} name="Mensagem" label="Mensagem" id="inputMensagem"/>
            </div>
            <div className={styles.divButton}>
                <Button type="submit" className="submit" id="btnEnviar" children="Enviar" onClick={handleSubmit}/>
            </div>
        </div>
        <div className={styles.rightScreen}>
            <img src="../../../public/coin.svg" alt="" className={styles.coin}/>
        </div>
        <Snackbar open={openMessage} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Moedas enviadas com sucesso!
          </Alert>
        </Snackbar>
        <Snackbar open={openErrorMessage} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
              Preencha todos os campos!
          </Alert>
        </Snackbar>
    </div>
  )
}

export default EnviarMoedas