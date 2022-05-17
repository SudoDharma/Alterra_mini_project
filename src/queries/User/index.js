import { gql } from "@apollo/client";

export const GET_ONE_USER = gql`
    query get_one_user($email: String, $password: String) {
        user(where: {email: {_eq: $email}, password: {_eq: $password}}) {
            email,
            name,
        }
    }
`

export const GET_EMAIL = gql`
    query get_email($email: String) {
        user(where: {email: {_eq: $email}}) {
            email,
        }
    }
`

export const INSERT_ONE_USER = gql`
    mutation insert_user($email: String, $name: String, $password: String){
        insert_user(objects: {email: $email, name: $name, password: $password}){
            affected_rows
        }
    }
`