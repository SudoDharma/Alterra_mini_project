import { useNavigate } from "react-router-dom"

import style from "./style.module.css"

const Card = ({movie}) => {

    const navigate = useNavigate()

    const movieDetail = () => {
        navigate(`/detail/${movie.id}`)
    }

    return(
        <div className={style.container} onClick={movieDetail}>
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="poster" />
            <div className={style.movie_detail}>
                <h3>{movie.title}</h3>
                <h5>{movie.release_date.substr(0,4)}</h5>
                <h5 style={{position: "absolute", bottom:"0"}}>{movie.vote_average}⭐</h5>
            </div>
        </div>
    )
}

export default Card