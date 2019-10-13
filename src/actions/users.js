import axios from 'axios';
import { API_URL } from './../config.js'

export function userAuth(){
    const request = axios.get(`${API_URL}/user/auth`)
                    .then(response => {
                        return response.data
                    })
    return {
        type:'USER_AUTH',
        payload:request
    }
}

export function userLogOut(){
    let request = {
        isAuth: false,
        message: "LogOut",
        status: "failed"
    }
    return {
        type:'USER_LOGOUT',
        payload:request
    }
}