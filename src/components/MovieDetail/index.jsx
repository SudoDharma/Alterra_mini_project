import { useLocation } from "react-router-dom"

import style from "./style.module.css"

import Time from "../Time"

const MovieDetail = ({data, trailerStatus, trailerKey}) => {
    const location = useLocation()

    const movie = data.movie
    
    return(
        <div className={style.container}>
            <div className={style.image_container}>
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="poster" />
                
                {location.pathname === "/buy" && (
                    <Time data={data}/>
                )}
            </div>
            
            <div className={style.detail_container}>
                <h2>{movie.title}({movie.release_date.substr(0,4)})</h2>
                <h4>{movie.vote_average}⭐ ~ {movie.runtime} minutes</h4>
                
                {trailerStatus ? (
                    <div className={style.trailer_container}>
                        <iframe width="100%" height="360" src={`https://www.youtube.com/embed/${trailerKey}?rel=0`}  allowFullScreen></iframe>
                    </div>
                ) : (
                    <h1>No trailer :(</h1>
                )}
                
                {location.pathname === "/buy" ? (
                    <h4 className={style.genres}>{movie.genres}</h4>
                ) : (
                    <div className={style.genre_container}>
                        {movie.genres.map((genre, genreIdx) => (
                            <h4 key={genreIdx}>{genre.name}</h4>
                        ))}
                    </div>
                )}

                <p>{movie.overview}</p>
            </div>
        </div>
    )
}

export default MovieDetail