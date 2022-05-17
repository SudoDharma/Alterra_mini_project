import { useState, useEffect } from "react"

import { useNavigate, useLocation } from "react-router-dom"

import { useLazyQuery } from "@apollo/client"
import { GET_TICKET } from "../../queries/Ticket"

import style from "./style.module.css"

import Ticket from "../../components/Ticket"
import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"

const TicketPage = () => {
    
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const status = localStorage.getItem("name")
        
        if(status === null){
            navigate("/login", {replace: true})
        }
    },[])

    const [tickets, setTickets] = useState([])

    const [get_ticket, {loading}] = useLazyQuery(GET_TICKET, {
        onCompleted: (data) => {
            setTickets(data.ticket)
        },
        onError: (error) => {
            console.log(error)
        }
    })
    
    useEffect(() => {
        get_ticket({
            variables: {
                email: localStorage.getItem("email")
            }
        })
    },[location])
    
    return(
        <div>
            <Navbar/>
            <Sidebar/>
            <div className={style.container}>
                {loading ? (
                    <h1>Getting ticket...</h1>
                ) : (
                    tickets.length === 0 ? (
                        <h1>No ticket :(</h1>
                    ) : (
                        tickets.map((ticket, ticketIdx) => (
                            <Ticket ticket={ticket} key={ticketIdx}/>
                        ))
                    )
                )}
            </div>
        </div>
    )
}

export default TicketPage