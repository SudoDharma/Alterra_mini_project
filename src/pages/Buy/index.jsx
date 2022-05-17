import { useEffect, useState } from "react"

import { useQuery } from "@apollo/client"
import { GET_THEATER_MOVIE } from "../../queries/Theater"

import style from "./style.module.css"

import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"
import MovieDetail from "../../components/MovieDetail"

const Buy = () => {

    const { data, loading, error } = useQuery(GET_THEATER_MOVIE)
    
    return(
        <div>
            <Navbar/>
            <Sidebar/>
            <div className={style.container}>
                {loading ? (
                    <h1>Loading...</h1>
                ) : (
                    data.theater.map((item, itemIdx) => (
                        <div key={itemIdx}>
                            <h1>{`Theater ${itemIdx + 1}`}</h1>
                            <MovieDetail data={item} trailerStatus={item.movie.trailer_status} trailerKey={item.movie.trailer_key} key={itemIdx}/>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default Buy