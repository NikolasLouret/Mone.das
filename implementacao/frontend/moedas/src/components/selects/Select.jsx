import { useState } from 'react'
import './Select.css'

const Select = ({ id, name, className, onChange, options, objectOptions, label, required }) => {
    const [value, setValue] = useState("");

    const handleChange = ({ target }) => {
        setValue(target.value)
        onChange && onChange(target.value)
    }

    return (
        <div className="select-component">
            { label && <label htmlFor={ id }>{ label }</label> }
            <select
                id={ id }
                className={ className ? className : "" }
                onChange={ handleChange }
                value={ value }
                name={ name }
                required={ required && required }
            >
                <option value="0">Selecione uma opção</option>
                {
                    objectOptions ? 
                        objectOptions.map(option => <option key={ option._id } value={ option._id }>{ option.nome }</option>)
                    :
                        options.map(option => <option key={ option } value={ option }>{ option }</option>)
                }
            </select>
        </div>
    )
}

export default Select