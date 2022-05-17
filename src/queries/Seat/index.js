import { gql } from "@apollo/client";

export const GET_SEAT_BY_THEATER_TIME = gql`
    query get_seat($theater_id: String, $time: String) {
        seat(where: {theater_id: {_eq: $theater_id}, time: {_eq: $time}}, order_by: {seat: asc}){
            id
            seat
            theater_id
            time
            available
        }
    }
`

export const UPDATE_SEAT = gql`
    mutation update_seat($objects: [seat_insert_input!]!){
        insert_seat(objects: $objects , on_conflict: {
            constraint: seat_pkey,
            update_columns: [available]
        }){
            affected_rows
        }
    }
`

export const UPDATE_SEAT_ONE = gql`
    mutation update_seat($id: String!, $available: Boolean){
        update_seat_by_pk(pk_columns: {id: $id}, _set: {available: $available}) {
            id
        }
    }
`