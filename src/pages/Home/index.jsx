import style from "./style.module.css"

import axios from "axios"

import { useState, useEffect } from "react"

import { useNavigate } from "react-router-dom"

import Card from "../../components/Card"
import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"

const Home = () => {

    const navigate = useNavigate()

    const [nowShowing, setNowShowing] = useState()
    const [popular, setPopular] = useState()

    const nowShowingEndPoint = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}`

    const popularEndPoint = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`

    const getNowShowing = () => {
        axios.get(nowShowingEndPoint)
        .then((res) => {
            setNowShowing(res["data"]["results"])
        })
        .catch((err) => {
            console.log(err)
        })
    } 

    const getPopular = () => {
        axios.get(popularEndPoint)
        .then((res) => {
            setPopular(res["data"]["results"])
        })
        .catch((err) => {
            console.log(err)
        })
    } 

    useEffect(() => {
        getNowShowing()
        getPopular()
    },[])
    
    return(
        <div>
            <Navbar/>
            <Sidebar/>
            <div className={style.container}>
                {nowShowing === undefined || popular === undefined ? (
                    <h1>Getting movies...</h1>
                ) : (
                    <div>
                        <div className={style.slider_container}>
                            <h1>Now Showing</h1>
                            <div className={style.movies_slider}>
                                {nowShowing.map((movie, movieIdx) => (
                                    <Card movie={movie} key={movieIdx}/>
                                ))}
                            </div>
                        </div>

                        <div className={style.slider_container}>
                            <h1>Popular right now</h1>
                            <div className={style.movies_slider}>
                                {popular.map((movie, movieIdx) => (
                                    <Card movie={movie} key={movieIdx}/>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home