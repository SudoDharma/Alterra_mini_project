import { gql } from "@apollo/client";

export const GET_THEATER_MOVIE = gql`
    query get_theater_movie {
        theater {
            id
            movie_id
            sesi_1
            sesi_2
            sesi_3
            movie {
                id
                title
                poster_path
                genres
                release_date
                runtime
                trailer_key
                trailer_status
                vote_average
                overview
            }
        }
    }
`