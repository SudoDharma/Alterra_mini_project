import { useState } from "react"

import { useLocation } from "react-router-dom"

import { useMutation } from "@apollo/client"
import { INSERT_TICKET } from "../../queries/Ticket"
import { UPDATE_SEAT } from "../../queries/Seat"

import { useNavigate } from "react-router-dom"

import style from "./style.module.css"

import Summary from "../../components/Summary"
import Navbar from "../../components/Navbar"

const SummaryPage = () => {

    const location = useLocation()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    const [insert_ticket, {}] = useMutation(INSERT_TICKET, {
        onCompleted: (data) => {

            const seats = location.state.seats.map((seat, seatIdx) => {
                return {
                    ...seat, available: !seat.available 
                }
            })

            update_seat({
                variables: {
                    objects: seats
                }
            })
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const [update_seat, {}] = useMutation(UPDATE_SEAT, {
        onCompleted: (data) => {
            alert("Ticket purchased successfully")
            setLoading(false)
            navigate("/")
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const buyQuery = () => {
        const answer = window.confirm("Confirm purchase?")
        
        if(answer){
            setLoading(true)

            insert_ticket({
                variables: {
                    objects: location.state.ticket
                }
            })
        }
    }
    
    return(
        <div>
            <Navbar/>
            <div className={style.container}>
                <h1>Summary</h1>
                <Summary data={location.state} buyQuery={buyQuery} loading={loading}/>
            </div>
        </div>
    )
}

export default SummaryPage