import styles from './CardVantagem.module.css'

import { GiTwoCoins } from 'react-icons/gi'

const CardVantagem = ({ content, onClick }) => {
  
  return (
    <div className={ styles.card } onClick={ () => onClick(content._id) } id={ content._id }>
      <img src={ '/backend/files/' + content.foto } alt={ content.nome } />

      <div className={ styles.content + ' flex flex-column' }>
        <h3 className={ styles.name }>{ content.nome }</h3>
        <p className={ styles.description }>{ content.descricao }</p>

        <div className={ styles.value }>
            <span>{ content.preco }</span> <GiTwoCoins size='1.3rem' color='#FFC700' />
        </div>
      </div>
      <span className={ styles.empresa }>{ content.empresa.pessoa.nome }</span>
    </div>
  )
}

export default CardVantagem