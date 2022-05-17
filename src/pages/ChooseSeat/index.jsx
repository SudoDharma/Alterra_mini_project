import { useState, useEffect } from "react"

import { useLocation, useNavigate } from "react-router-dom"

import { useLazyQuery } from "@apollo/client"
import { GET_SEAT_BY_THEATER_TIME } from "../../queries/Seat"

import style from "./style.module.css"

import Navbar from "../../components/Navbar"
import Seat from "../../components/Seat"

const ChooseSeat = () => {
    
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const status = localStorage.getItem("name")
        
        if(status === null){
            navigate("/login", {replace: true})
        }
    },[])


    const [seats, setSeats] = useState()
    const [select, setSelect] = useState([])
    const [ticket, setTicket] = useState([])
    const price = 40000

    const [get_seat, {}] = useLazyQuery(GET_SEAT_BY_THEATER_TIME,{
        onCompleted: (data) => {
            setSeats(data.seat)
        },
        onError: (error) => {
            console.log(error)
        }
    })
    
    useEffect(() => {
        get_seat({
            variables: {
                theater_id: location.state.data.id,
                time: location.state.sesi
            }
        })
    },[])

    useEffect(() => {
        const newTicket = select.map((item, itemIdx) => {
            return {
                seat_id: item.id,
                user_email: localStorage.getItem("email")
            }
        })
        
        setTicket(newTicket)
    },[select])
    
    const handleSeatClick = (seat, seatIdx) => {
        const check = select.filter((item, itemIdx) => {
            return item.id === seat.id
        })

        if(check.length > 0){
            const unSelectSeat = select.filter((item, itemIdx) => {
                return item.id !== seat.id
            })

            setSelect(unSelectSeat)
        }
        else{
            const newSelect = [...select]
            newSelect.push(seat)
            
            setSelect(newSelect)
        }
    }

    const handleSummaryClick = () => {
        navigate("summary",{
            state: {
                seats: select,
                ticket: ticket,
                cost: `Rp.${(select.length * price).toLocaleString()}`,
                theater: `Theater ${(location.state.data.id).substr(1)}`,
                time: location.state.sesi,
                movie: location.state.data.movie.title
            }
        })
    }
    
    return(
        <div>
            <Navbar/>
            <div className={style.container}>
                <div className={style.theater_detail}>
                    <h2>{`Theater ${(location.state.data.id).substr(1)}`}</h2>
                    <h4>{`${location.state.sesi}`}</h4>
                </div>

                <h1>Pick your seat</h1>

                <div className={style.seat_container}>
                    {seats === undefined ? (
                        <h1>Getting the seat...</h1>
                    ) : (
                        seats.map((seat, seatIdx) => (
                            (seat.seat === "A4") || (seat.seat === "B4") || (seat.seat === "C4") ? (
                                <Seat seat={seat} gap={true} key={seatIdx} handleSeatClick={handleSeatClick}/>
                            ) : (
                                <Seat seat={seat} gap={false} key={seatIdx} handleSeatClick={handleSeatClick}/>
                            )
                        ))
                    )}

                    <div className={style.screen}>Screen here</div>
                </div>

                <div className={style.summary_container}>
                    <div className={style.summary_content}>
                        <h3>Selected seat:</h3>
                        <div className={style.select_seat_container}>
                            {select.length === 0 ? (
                                <h4>No seat selected</h4>                          
                            ) : (
                                select.map((seat, seatIdx) => (
                                    <Seat seat={seat} gap={false} key={seatIdx} 
                                    handleSeatClick={handleSeatClick}/>
                                ))      
                            )}
                        </div>
                    </div>
                    <div className={style.summary_content}>
                        <h3>Total price:</h3>
                        <h4>{`Rp.${(select.length * price).toLocaleString()}`}</h4>

                        {select.length > 0 && (
                            <button onClick={() => handleSummaryClick()}>Summary</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChooseSeat