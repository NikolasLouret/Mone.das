import React from 'react'
import styles from './EnviarMoedas.module.css'
import Input from '../../components/inputs/Input'
import Button from '../../components/buttons/Button'

const EnviarMoedas = () => {
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
                    <Input type="text" name="Matrícula" label="Matrícula" id="inputMatricula" />
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
                <Input type="text" className={styles.inputSenha} name="Senha" label="Senha" id="inputSenha" />
            </div>
            <div className={styles.divButton}>
                <Button type="submit" className="submit" id="btnEnviar" children="Enviar" />
            </div>
        </div>
        <div className={styles.rightScreen}>
            <img src="../../../public/coin.svg" alt="" className={styles.coin}/>
        </div>
    </div>
  )
}

export default EnviarMoedas