import { useNavigate } from "react-router-dom"

import style from "./style.module.css"

const Summary = ({data, buyQuery, loading}) => {

    const navigate = useNavigate()

    return(
        <div className={style.container}>
            <h4>{data.theater}</h4>
            <h4>{`Movie: ${data.movie}`}</h4>
            <h4>{`Time: ${data.time}`}</h4>

            <div>
                <div className={style.seat_container}>
                    <h4>Seat: </h4>
                    {data.seats.map((seat, seatIdx) => (
                        <h4 key={seatIdx}>{seat.seat}</h4>
                    ))}
                </div>
            </div>

            <h4>{`Cost : ${data.cost}`}</h4>

            <button disabled={loading} onClick={() => buyQuery()}>Buy</button>
            <button disabled={loading} onClick={() => navigate(-1)}>Cancel</button>
        </div>
    )
}

export default Summary