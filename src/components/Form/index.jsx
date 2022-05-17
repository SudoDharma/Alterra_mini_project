import { useLocation, Link } from "react-router-dom"

import style from "./style.module.css"

const Form = ({inputs, setInputs, buttonQuery, button, loading}) => {
    
    const location = useLocation()
    
    const handleChange = (value, index) =>{
        const newInputs = [...inputs]
        newInputs[index].value = value

        setInputs(newInputs)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        buttonQuery()
    }
    
    return(
        <form onSubmit={handleSubmit}>
            {inputs.map((input, inputIdx) => (
                <div className={style.container} key={inputIdx}>
                    <label key={inputIdx}>{input.label}</label>
                    <input type={input.type} value={input.value} 
                    onChange={(e) => handleChange(e.target.value, inputIdx)} 
                    pattern={input.pattern} title={input.title} required/>
                </div>
            ))}
            
            {location.pathname === "/login" && (
                <p>Don't have an account? click <Link to={"/register"}>here</Link> </p>
            )}

            <button disabled={loading}>{button}</button>
        </form>
    )
}

export default Form