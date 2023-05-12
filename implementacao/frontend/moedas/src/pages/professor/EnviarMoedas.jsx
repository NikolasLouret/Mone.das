import React, { useState } from 'react'
import styles from './EnviarMoedas.module.css'
import Input from '../../components/inputs/Input'
import Button from '../../components/buttons/Button'

const EnviarMoedas = () => {
    var [aluno,setAluno] = useState({})

    function handleSubmit(e){
        e.preventDefault()
        var email = document.getElementById("inputMatricula").value;
        var moedas = document.getElementById("inputMoedas").value;
        var mensagem = document.getElementById("inputMensagem").value;

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
                  "tipo": "Envio",
                  "idDestinatario": data.pessoa.carteira,
                  "idRemetente": "645bff468a6ecb1e80a07815",
                  "valor": moedas
                })
              })
              .then(resp => resp.json())
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
                    <Input type="text" name="Moedas" label="Moedas" id="inputMoedas" />
                </div>
                <div className={styles.inputInformations}>          
                    <p>Saldo atual: </p>
                    <p>Saldo final: </p>
                </div>
            </div>
            <div>
                <Input type="text" className={styles.inputSenha} name="Mensagem" label="Mensagem" id="inputMensagem" />
            </div>
            <div className={styles.divButton}>
                <Button type="submit" className="submit" id="btnEnviar" children="Enviar" onClick={handleSubmit}/>
            </div>
        </div>
        <div className={styles.rightScreen}>
            <img src="../../../public/coin.svg" alt="" className={styles.coin}/>
        </div>
    </div>
  )
}

export default EnviarMoedas