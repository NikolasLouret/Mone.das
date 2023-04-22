import { useEffect, useState } from 'react'
import './Input.css'

const Input = ({ type, name, id, className, initialValue, onChange, label, required, disabled }) => {
    const [value, setValue] = useState("");

    const handleChange = ({ target }) => {
        setValue(target.value)
        onChange && onChange(id, target.value)
    }

    useEffect(() => {
        initialValue && setValue(initialValue)
    }, [initialValue])

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
                disabled={ disabled && disabled }
            />
        </div>
    )
}

export default Input