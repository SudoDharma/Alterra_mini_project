import { useState, useEffect } from "react"

import { useNavigate } from "react-router-dom"

import style from "./style.module.css"

const Navbar = () => {

    const navigate = useNavigate()

    const [ isLoggedIn, setIsLoggedIn ] = useState(false)

    useEffect(() => {
        const status = localStorage.getItem("name")
        
        if(status !== null){
            setIsLoggedIn(true)
        }
    },[])

    const toLogin = () => {
        navigate("/login")
    }

    const logout = () => {
        const answer = window.confirm("Are you sure want to logout?")
        
        if(answer){
            localStorage.removeItem("email")
            localStorage.removeItem("name")

            setIsLoggedIn(false)
            navigate("/")
        }
    }

    return(
        <div className={style.container}>
            <h1>Ticks<span>Me</span></h1>
            {isLoggedIn ? (
                <h3 onClick={() => logout()}>Hello, {localStorage.getItem("name")}</h3>
            ) : (
                <h3 onClick={() => toLogin()}>Login</h3>
            )}
        </div>
    )
}

export default Navbar