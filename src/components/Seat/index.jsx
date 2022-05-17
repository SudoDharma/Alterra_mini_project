import style from "./style.module.css"

const Seat = ({seat, gap, handleSeatClick}) => {
    


    return(
        <div className={style.container} 
        style={{
            marginRight: gap ? "3rem" : "0",
            pointerEvents: seat.available ? "" : "none",
            backgroundColor: seat.available ? "" : "gray"
        }} 
        onClick={() => handleSeatClick(seat)}>
            <h2>{seat.seat}</h2>
        </div>
    )
}

export default Seat