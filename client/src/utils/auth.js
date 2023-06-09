import { API } from "../config/api"
import { useContext } from "react"
import { UserContext } from "./context/userContext"

export async function register(data) {
    try {
        const response = await API.post('register', data)
        console.log('Register SUCCESS', response)
        
    } catch(error) {
        throw new error('Failed Register')

    }
}

export async function login(data) {
    // const [_,dispatch] = useContext(UserContext)
    try {
        const login = await API.post('login', data)
        console.log('Login Success', login?.data)
        if (login) {
            return login?.data
        }
    } catch(error) {
        throw new error('Failed Login')

    }
}