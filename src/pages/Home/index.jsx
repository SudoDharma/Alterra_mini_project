import style from "./style.module.css"

import axios from "axios"

import { useState, useEffect } from "react"

import Card from "../../components/Card"
import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"

const Home = () => {

    const [movies, setMovies] = useState()

    const endPoint = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}`

    const getMovies = () => {
        axios.get(endPoint)
        .then((res) => {
            setMovies(res["data"]["results"])
        })
        .catch((err) => {
            console.log(err)
        })
    } 

    useEffect(() => {
        getMovies()
    },[])
    
    return(
        <div>
            <Navbar/>
            <Sidebar/>
            <div className={style.container}>
                <div className={style.now_showing_container}>
                    <h1>Now Showing</h1>
                    <div className={style.movies_slider}>
                        {movies === undefined ? (
                            <h1>Loading</h1>
                        ) : (
                            movies.map((movie, movieIdx) => (
                                <Card movie={movie} key={movieIdx}/>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home