import { useState } from "react"

import { useNavigate } from "react-router-dom"

import { useLazyQuery, useMutation } from "@apollo/client"
import { GET_EMAIL, INSERT_ONE_USER } from "../../queries/User"

import style from "./style.module.css"

import Form from "../../components/Form"

const Register = () => {
    
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    
    const [inputs, setInputs] = useState([
        {
            label: "Email",
            type: "email",
            value: "",
            pattern: ".{0,}",
            title: ""
        },
        {
            label: "Name",
            type: "text",
            value: "",
            pattern: "[A-Za-z]{0,}",
            title: "Name is letter only"
        },
        {
            label: "Password",
            type: "password",
            value: "",
            pattern: ".{8,}",
            title: "Minimum lenght of password is 8 characters"
        },
        {
            label: "Confirm password",
            type: "password",
            value: "",
            pattern: ".{8,}",
            title: "Minimum lenght of password is 8 characters"
        }
    ])

    const [check_user, {}] = useLazyQuery(GET_EMAIL, {
        onCompleted: (data) => {
            if(data.user.length > 0){
                alert("Email is already used")
                setLoading(false)
            }
            else{
                insert_user({
                    variables: {
                        email: inputs[0].value,
                        name: inputs[1].value,
                        password: inputs[2].value
                    }
                })
            }
        },
        onError: (error) =>{
            console.log(error)
        }
    })

    const [insert_user, {}] = useMutation(INSERT_ONE_USER,{
        onCompleted: (data) => {
            alert("Akun berhasil dibuat")
            setLoading(false)

            navigate("/login")
        },
        onError: (error) =>{
            console.log(error)
        }
    })


    const buttonQuery = () => {
        setLoading(true)

        if(inputs[2].value !== inputs[3].value){
            alert("Password does not match")
            setLoading(false)
        }
        else{
            check_user({
                variables: {
                    email: inputs[0].value
                }
            })
        }

    }

    return(
        <div className={style.container}>
            <h1>Register</h1>
            <Form inputs={inputs} setInputs={setInputs} buttonQuery={buttonQuery} button={"Register"} loading={loading}/>
        </div>
    )
}

export default Register