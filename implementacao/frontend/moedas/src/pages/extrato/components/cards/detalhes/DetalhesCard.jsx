import styles from './DetalhesCard.module.css'

import { FaUniversity } from 'react-icons/fa'
import { HiUser } from 'react-icons/hi2'
import { IoCalendarOutline } from 'react-icons/io5'
import { TbCoins, TbFileDescription } from 'react-icons/tb'

const DetalhesCard = ({ transaction }) => {
  return (
    <div className={ styles.cardDetalhes }>
        <h1 className={ styles.detalhesTitle }>DETALHES<span>.</span></h1>
        <div className={ styles.typeIcon }>
            { transaction.tipo == 'transferencia' ? <FaUniversity /> : <HiUser /> }
        </div>
        <p className={ styles.type }>{ transaction.tipo }</p>
        <p className={ styles.value }>{ transaction.valor }</p>
        <div className={ styles.detalhesInfo }>
            <div className={ styles.date }>
                <p className={ styles.labelDate }><IoCalendarOutline /> Data</p>
                <p className={ styles.dateData }>{ transaction.data }</p>
            </div>
            <div className={ styles.from }>
                <p className={ styles.labelDate }>{ transaction.tipo == 'transferencia' ? <FaUniversity /> : <HiUser /> } Recebido de</p>
                <p className={ styles.fromData }>{ transaction.origem }</p>
            </div>
            <div className={ styles.value }>
                <p className={ styles.labelValue }><TbCoins /> Valor</p>
                <p className={ styles.valueData }>{ transaction.valor }</p>
            </div>
            { transaction.descricao && <div className={ styles.description }>
                <p className={ styles.labeDescription }><TbFileDescription /> Descrição</p>
                <p className={ styles.descriptionData }>{ transaction.descricao }</p>
            </div> }
        </div>
    </div>
  )
}

export default DetalhesCard