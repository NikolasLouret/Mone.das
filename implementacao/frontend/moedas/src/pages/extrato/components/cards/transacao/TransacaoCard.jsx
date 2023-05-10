import styles from './TransacaoCard.module.css'

import { HiArrowDownLeft, HiArrowUpRight } from 'react-icons/hi2'

const TransacaoCard = ({ transaction }) => {
  return (
    <div className={ styles.cardExtrato }>
      <div className={ styles[transaction.tipo] }>
        { transaction.tipo == 'transferencia' ? <HiArrowDownLeft /> : <HiArrowUpRight /> }
      </div>
      <div className={ styles.cardInfos }>
        <div>
          <h3 className={ styles.cardTitle }>{ transaction.origem.nome }</h3>
          <p className={ styles.cardType }>{ transaction.tipo == 'transferencia' ? 'Transferencia' : 'Recebido' }</p>
        </div>
        <p className={ styles.cardValue }>{ transaction.valor }</p>
      </div>
    </div>
  )
}

export default TransacaoCard