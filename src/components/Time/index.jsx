import { useState } from "react"

import { useNavigate } from "react-router-dom"

import style from "./style.module.css"

const Time = ({data}) => {

    const navigate = useNavigate()

    const time = [data.sesi_1, data.sesi_2, data.sesi_3]

    const selectedStyle = {
        backgroundColor: "black",
        color: "white"
    }
    
    const [select, setSelect] = useState("")
    
    const handleBuyClick = () => {
        // console.log(`${data.id} ${select}`)
        navigate("seat", {
            state: {
                data: data,
                sesi: select   
            }
        })
    }

    return(
        <div className={style.container}>
            <div className={style.time_container}>
                {time.map((time, timeIdx) => (
                    <div className={style.time} key={timeIdx} onClick={() => setSelect(time)}
                    style={select === time ? selectedStyle : {}}>
                        <p>{time}</p>
                    </div>
                ))}
            </div>

            <button onClick={() => handleBuyClick()} disabled={select === "" ? true : false }>Buy ticket</button>
        </div>
    )
}

export default Time