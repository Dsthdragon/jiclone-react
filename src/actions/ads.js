import axios from 'axios';
import { API_URL } from './../config.js'

export function createAds(data){
    const request = axios.post(`${ API_URL }/service`, data)
                    .then(response => response.data)
    return {
        type:'CREATE_AD',
        payload:request
    }
}

export function updateAds(data){
    const request = axios.put(`${ API_URL }/service`, data)
                    .then(response => response.data)
    return {
        type:'UPDATE_AD',
        payload:request
    }
}

export function clientAds(client, limited=0, page=1){
    const request = axios.get(`${API_URL}/client_services/${client}?limited=${limited}&page=${page}`)
                    .then(response => {
                        return response.data
                    })
    return {
        type:'GET_CLIENT_ADS',
        payload:request
    }
}

export function categoryAds(category,{limited=0, page=1, per_page = 0})
{
    const request = axios.get(`${API_URL}/category_service/${category}?limited=${limited}&page=${page}&per_page=${per_page}`)
                    .then(response => {
                        return response.data
                    })
    return {
        type: 'GET_CATEGORY_ADS',
        payload: request
    }
}

export function getAd(ad, viewed=0){
    const request = axios.get(`${API_URL}/service/${ad}?viewed=${viewed}`)
                    .then(response => {
                        return response.data
                    })
    return {
        type:'GET_AD',
        payload:request
    }
}

export function getAds({limited=0, per_page = 0 ,page=1}){
    const request = axios.get(`${API_URL}/service?limited=${limited}&page=${page}&per_page=${per_page}`)
                    .then(response => {
                        return response.data
                    })
    return {
        type:'GET_ADS',
        payload:request
    }
}

export function findAds(searchQuery){
    if(searchQuery.charAt(0) !== '?')
    {
        searchQuery = '?' + searchQuery;
    }
    const request = axios.get(`${API_URL}/find_service${searchQuery}`)
                    .then(response => {
                        return response.data
                    })
    return {
        type:'FIND_ADS',
        payload:request
    }
}