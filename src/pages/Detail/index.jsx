import { useState, useEffect } from "react"

import axios from "axios"

import { useParams } from "react-router-dom"

import style from "./style.module.css"

import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"
import MovieDetail from "../../components/MovieDetail"

const Detail = () => {

    const param = useParams()

    const [data, setData] = useState()
    const [trailerKey, setTrailerKey] = useState()
    const [trailerStatus, setTrailerStatus] = useState(false)
    
    const movieEndPoint = `https://api.themoviedb.org/3/movie/${param.id}?api_key=${process.env.REACT_APP_API_KEY}`

    const trailerEndPoint = 
    `https://api.themoviedb.org/3/movie/${param.id}/videos?api_key=${process.env.REACT_APP_API_KEY}`

    const getMovie = () => {
        axios.get(movieEndPoint)
        .then((res) => {
            setData({
                movie: res.data
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const getMovieTrailer = () => {
        axios.get(trailerEndPoint)
        .then((res) => {            
            const trailer = res.data.results.filter((video, videoIdx) => {
                return video.name.includes("Trailer")
            })
            
            if(trailer.length === 0){
                setTrailerStatus(false)
                setTrailerKey("none")
            } 
            else{
                setTrailerStatus(true)
                setTrailerKey(trailer[0].key)
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        getMovie()
        getMovieTrailer()
    },[])
    
    return(
        <div>
            <Navbar/>
            <Sidebar/>
            <div className={style.container}>
                {data === undefined || trailerKey === undefined ? (
                    <h1>Loading...</h1>
                ) : (
                    <MovieDetail data={data} trailerKey={trailerKey} trailerStatus={trailerStatus}/>
                )}                
            </div>
        </div>
    )
}

export default Detail