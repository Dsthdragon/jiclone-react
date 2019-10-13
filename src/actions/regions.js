import axios from 'axios';
import { API_URL } from './../config.js'

export function getRegions(limited=0, page=1){
    const request = axios.get(`${API_URL}/region?limited=${limited}&page=${page}`)
                    .then(response => {
                        return response.data
                    })
    return {
        type:'GET_REGIONS',
        payload:request
    }
}