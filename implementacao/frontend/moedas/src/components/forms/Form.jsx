import Button from '../buttons/Button'
import './Form.css'

const Form = ({ onSubmit, children, textButton }) => {

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
                <Button type="submit" className="submit" id="submit">{ textButton }</Button>
            </div>
        </form>
    )
}

export default Form