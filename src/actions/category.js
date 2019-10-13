import axios from 'axios';
import { API_URL } from '../config.js'

export function getCategories(limited=0, page=1){
    const request = axios.get(`${API_URL}/category?limited=${limited}&page=${page}`)
                    .then(response => {
                        return response.data
                    })
    return {
        type:'GET_CATEGORIES',
        payload:request
    }
}

export function getCategory(category){
    const request = axios.get(`${API_URL}/category/${category}`)
                    .then(
                        response => {
                            return response.data
                        }
                    )

    return {
        type: 'GET_CATEGORY',
        payload: request
    }
}