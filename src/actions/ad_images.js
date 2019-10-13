import axios from 'axios';
import { API_URL } from './../config.js'

export function getAdImages(ad){
    const request = axios.get(`${ API_URL }/service_image/${ad}`)
                    .then(response => response.data)
    return {
        type:'GET_AD_IMAGES',
        payload:request
    }
}

export function uploadAdImages(data){
    const request = axios.post(`${API_URL}/service_image`, data)
                    .then(response => response.data)
    return {
        type:'UPLOAD_AD_IMAGE',
        payload:request
    }
}

export function deleteAdImage(data){
    const request = axios.post(`${API_URL}/service_image/delete`, data)
                    .then(response => response.data)
    return {
        type:'DEELTE_AD_IMAGE',
        payload:request
    }
}

export function mainAdImage(data){
    const request = axios.post(`${API_URL}/service_image/main`, data)
                    .then(response => response.data)
    return {
        type:'MAIN_AD_IMAGE',
        payload:request
    }
}