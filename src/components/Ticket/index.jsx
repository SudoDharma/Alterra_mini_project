import { useNavigate } from "react-router-dom"

import { useMutation } from "@apollo/client"
import { DELETE_TICKET } from "../../queries/Ticket"
import { UPDATE_SEAT_ONE } from "../../queries/Seat"

import style from "./style.module.css"

export const Ticket = ({ticket}) => {

    const navigate = useNavigate()

    const [delete_ticket, {}] = useMutation(DELETE_TICKET, {
        onCompleted: (data) => {
            alert("Ticket deleted successfully")
            navigate(0)
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const [update_seat, {}] = useMutation(UPDATE_SEAT_ONE, {
        onCompleted: (data) => {
            delete_ticket({
                variables: {
                    id: ticket.id
                }
            })
        },
        onError: (error) => {
            console.log(error)
        }
    })
    
    const handleDeleteClick = () => {
        const answer = window.confirm("Are you sure want to delete the ticket?")

        if(answer){
            update_seat({
                variables: {
                    id: ticket.seat_id,
                    available: !ticket.seat.available
                }
            })
        }
    }

    return(
        <div className={style.container}>
            <div className={style.ticket_content}>
                <div className={style.image_container}>
                    <img src={`https://image.tmdb.org/t/p/w500/${ticket.seat.theater.movie.poster_path}`} alt="poster" />
                </div>

                <div className={style.ticket_detail}>
                    <h3>{`Theater ${(ticket.seat.theater.id).substr(1)}`}</h3>
                    <h3>{`Movie: ${ticket.seat.theater.movie.title}`}</h3>
                    <h3>{`Time: ${ticket.seat.time}`}</h3>
                    <h3>{`Seat: ${ticket.seat.seat}`}</h3>
                    <h3>{`Cost: Rp.40,000`}</h3>
                </div>
            </div>

            <button onClick={() => handleDeleteClick()}>🗑️</button>
        </div>
    )
}

export default Ticket