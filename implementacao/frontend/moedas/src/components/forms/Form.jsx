import { useRef } from 'react'
import './Form.css'

const Form = ({ onSubmit, children }) => {
    const form = useRef(null)
    
    const handleSubmit = e => {
        e.preventDefault()
        onSubmit(new FormData(form.current))
    }

    return (
        <form ref={ form } className="form-component" onSubmit={ handleSubmit }>
            { children }
        </form>
    )
}

export default Form