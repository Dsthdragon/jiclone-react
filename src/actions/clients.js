import axios from 'axios';
import { API_URL } from './../config.js'


export function getClients(
    start = 1,
    list =''
){
    const request = axios.get(`${API_URL}/client?page=${start}`)
                    .then(response => {
                        if(list){
                            return [...list, ...response.data]
                        } else {
                            return response.data
                        }
                    })
    
    return {
        type:'GET_CLIENTS',
        payload:request
    }
}

export function uploadAvatar(data){
    const request = axios.post(`${ API_URL }/client/avatar`, data)
                    .then(response => response.data)
    return {
        type:'UPLOAD_CLIENT_AVATAR',
        payload:request
    }
}

export function registerClient(data){
    const request = axios.post(`${ API_URL }/client`, data)
                    .then(response => response.data)
    return {
        type:'REGISTER_CLIENT',
        payload:request
    }
}

export function loginClient(data){
    const request = axios.post(`${ API_URL }/client/login`, data)
                    .then(response => response.data)
    return {
        type:'LOGIN_CLIENT',
        payload:request
    }
}