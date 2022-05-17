import { gql } from "@apollo/client";

export const INSERT_TICKET = gql`
    mutation insert_ticket($objects: [ticket_insert_input!]!){
        insert_ticket(objects: $objects){
            affected_rows
        }
    }
`

export const DELETE_TICKET = gql`
    mutation delete_ticket($id: Int!){
        delete_ticket_by_pk(id: $id){
            id
        }
    }
`

export const GET_TICKET = gql`
    query get_ticket($email: String){
        ticket(where: {user_email: {_eq: $email}}, order_by: {id: asc}) {
            id
            seat_id
            user_email
            seat {
                available
                seat
                time
                theater {
                    id
                    movie {
                        title
                        poster_path
                    }
                }
            }
        }
    }
`