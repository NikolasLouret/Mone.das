import { useEffect, useState } from 'react'
import './Select.css'

const Select = ({ id, name, className, onChange, options, initialValue, label, required }) => {
    const [value, setValue] = useState("");
    const [optionsValues, setOptionsValues] = useState()

    const handleChange = ({ target }) => {
        setValue(target.value)
        onChange && onChange(target.value)
    }

    useEffect(() => {
        document.getElementById(id).selectedIndex = "2"
        console.log(options)
    }, [])

    useEffect(() => {
        setOptionsValues(  
            options.some(option => { return typeof option == "object" }) ?
                options.map(option => <option key={ option._id } value={ option._id }>{ option.nome }</option>)
           :
                options.map(option => <option key={ option } value={ option }>{ option }</option>)
        )
    }, [options, initialValue])

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
                { optionsValues }
            </select>
        </div>
    )
}

export default Select