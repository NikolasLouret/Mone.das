import './Extrato.css'

import DetalhesCard from './components/cards/detalhes/DetalhesCard'
import SaldoCard from './components/cards/saldo/SaldoCard'
import TransacoesCard from './components/cards/transacoes/TransacoesCard'
import LinkedButton from '../../components/linked-buttons/LinkedButton'

import { useState, useEffect } from 'react'

import { CircularProgress } from '@mui/material'

const Extrato = () => {
  const [transacaoAtiva, setTransacaoAtiva] = useState(null)
  const [carteira, setCarteira] = useState(null)
  const [transacoes, setTransacoes] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState({
                                      nome: 'Nikolas Louret',
                                      carteira: '645e786bdb12dd278bcef5cb',
                                      email: 'nikolas@email.com',
                                      tipo: 'aluno'
                                    })
  
  useEffect(() => {
    fetch(`http://localhost:3000/api/carteira/${ user.carteira }`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(resp => resp = resp.json())
    .then(data => {
      setCarteira(data)
      setTransacoes(data.operacao)
    }).then(() => {
      setTimeout(() => {
        setIsLoading(false)
      }, 600)
    })
  }, [])

  const handleActiveTransacao = target => {
    setTransacaoAtiva(target)
  }

  return (
    <div className='extrato-body flex flex-column'>
      <div className='extrato-header'>
        <h1 className='extrato-title'>extrato<span>.</span></h1>
      </div>

      { isLoading ? 
          <CircularProgress />
        :
        <>
          <div className='saldo flex space-between column-gap-3rem'>
            <div className='grafico flex bg-darkgray box-shadow border-radius-1rem'></div>
            <SaldoCard saldo={ carteira.saldo } user={ user } />
          </div>

          { transacoes.length ?
            <div className='extrato-transacoes flex space-between'>
              <TransacoesCard onClick={ handleActiveTransacao } transactions={ transacoes } />

              <div className='detalhes-transacao'>{ transacaoAtiva && <DetalhesCard transaction={ transacaoAtiva } /> }</div>
            </div>
            :
            <div className='extrato-sem-transacoes'>
              <p className='mensagem-sem-transacoes'>Você ainda não possui transações</p>

              <div className='link-add-transacao'>
                { user.tipo === 'aluno' ?
                  <LinkedButton type='button' id='btn-vantagem' className='yellow' to='/'>Ver Vantagens</LinkedButton>
                  :
                  <LinkedButton type='button' id='btn-enviar-moedas' className='yellow' to='/'>Enviar Moedas</LinkedButton>
                }
              </div>
            </div>
        }
        </>
      }
    </div>
  )
}

export default Extrato