import style from "./style.module.css"

import { useNavigate } from "react-router-dom"

const NotFound = () => {

    const navigate = useNavigate()

    return(
        <div className={style.container}>
            <h1>404 not found</h1>
            <button onClick={() => navigate("/")}>Home</button>
        </div>
    )
}

export default NotFound