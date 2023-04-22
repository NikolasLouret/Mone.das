import LinkedButton from '../linked-button/LinkedButton'
import './Form.css'

const Form = ({ onSubmit, children, textButton, to }) => {

    const handleSubmit = e => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData)

        onSubmit(data)
    }

    return (
        <form className="form-component" onSubmit={ handleSubmit }>
            { children }
            <div className="button-submit">
                <LinkedButton type="submit" className="submit" id="submit" to={ to }>{ textButton }</LinkedButton>
            </div>
        </form>
    )
}

export default Form