import { useState } from "react"

import { useNavigate } from "react-router-dom"

import { useLazyQuery } from "@apollo/client"
import { GET_ONE_USER } from "../../queries/User"

import style from "./style.module.css"

import Form from "../../components/Form"

const Login = () => {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    const [user_login, {}] = useLazyQuery(GET_ONE_USER, {
        onCompleted: (data) => {
            if(data.user.length === 0){
                alert("Email atau password salah")
                setLoading(false)
            }
            else{
                alert("Berhasil login")
                setLoading(false)

                localStorage.setItem("email", data.user[0].email)
                localStorage.setItem("name", data.user[0].name)

                navigate("/")
            }
        },
        onError: (err) => {
            console.log(err)
        }
    })

    const [inputs, setInputs] = useState([
        {
            label: "Email",
            type: "email",
            value: "",
            pattern: ".{0,}",
            title: ""
        },
        {
            label: "Password",
            type: "password",
            value: "",
            pattern: ".{8,}",
            title: "Minimum lenght of password is 8 characters"
        }
    ])

    const buttonQuery = () => {
        setLoading(true)

        user_login({
            variables: {
                email: inputs[0].value,
                password: inputs[1].value 
            }
        })
    }

    return(
        <div className={style.container}>
            <h1>Login</h1>
            <Form inputs={inputs} setInputs={setInputs} buttonQuery={buttonQuery} button={"Login"} loading={loading}/>
        </div>
    )
}

export default Login