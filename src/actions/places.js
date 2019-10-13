import axios from 'axios';
import { API_URL } from '../config.js'

export function getPlaces(limited=0, page=1){
    const request = axios.get(`${API_URL}/place?limited=${limited}&page=${page}`)
                    .then(response => {
                        return response.data
                    })
    return {
        type:'GET_PLACES',
        payload:request
    }
}

export function getPlacesByRegion(region,limited=0, page=1){
    const request = axios.get(`${API_URL}/place/region/${region}?limited=${limited}&page=${page}`)
                    .then(response => {
                        return response.data
                    })
    return {
        type:'GET_PLACES_BY_REGION',
        payload:request
    }
}