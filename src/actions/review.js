import axios from 'axios';
import { API_URL } from './../config.js'

export function createReview(data){
    const request = axios.post(`${API_URL}/review`, data)
                    .then(response => {
                        return response.data
                    })
    return {
        type:'CREATE_REVIEW',
        payload:request
    }
}

export function checkReview(data){
    const request = axios.post(`${API_URL}/check_review`, data)
                    .then(response => {
                        return response.data
                    })
    return {
        type:'CHECK_REVIEW',
        payload:request
    }
}

export function serviceReviews(ad){
    const request = axios.get(`${API_URL}/service_review/${ad}`)
                    .then(response => {
                        return response.data
                    })
    return {
        type: 'SERVICE_REVIEWS',
        payload: request
    }
}