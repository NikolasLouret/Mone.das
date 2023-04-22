import { useState } from 'react'
import './Input.css'

const Input = ({ type, name, id, className, onChange, label, required }) => {
    const [value, setValue] = useState("");

    const handleChange = ({ target }) => {
        setValue(target.value)
        onChange && onChange(id, target.value)
    }

    return (
        <div className="input-component">
            { label && <label htmlFor={ id }>{ label }</label> }
            <input type={ type }
                id={ id }
                className={ className ? className : "" }
                onChange={ handleChange }
                value={ value }
                name={ name }
                required={ required && required }
            />
        </div>
    )
}

export default Input