import './LinkedButton.css'
import { Link } from 'react-router-dom'

const LinkedButton = ({ type, className, id, onClick, to, children }) => {
    return (
        <Link to={ to }>
            <button type={ type }
                className={ className && className }
                id={ id }
                onClick={ onClick && onClick }
                >
                    { children }
                </button>
        </Link>
    )
}

export default LinkedButton