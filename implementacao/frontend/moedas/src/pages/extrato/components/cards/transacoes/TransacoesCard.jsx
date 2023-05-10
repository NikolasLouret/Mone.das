import styles from './TransacoesCard.module.css'

import ExtratoCard from '../transacao/TransacaoCard'
import { useEffect, useState } from 'react'

const TransacoesCard = ({ transactions }) => {
  const [formattedTransactions, setFormattedTransactions] = useState([])

  useEffect(() => {
    setFormattedTransactions(formatTransactions(transactions))
  }, [])

  const formatTransactions = transactions => {

  }

  const calcTotalBalanceDay = ({ transactions }) => {
    console.log(transactions)
  }

  return (
    <div className={ styles.cardTransacoes }>
        <h1 className={ styles.transacoesTitle }>TRANSAÇÕES<span>.</span></h1>

        <div className={ styles.transactionBody }>
          { formattedTransactions.map(formatterTransaction => (
            <div className={ styles.transactionCard }>
              <div className={ styles.transactionHeader }>
                <h5 className={ styles.transactionDate }>{ formatterTransaction.date }</h5>
                <p className={ styles.totalBalance }>{ calcTotalBalanceDay(formatterTransaction.data) }</p>
              </div>
              <div className={ styles.transactionData }>
                { formatterTransaction.data.map(transaction => (
                  <ExtratoCard transaction={ transaction } />
                ))}
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default TransacoesCard