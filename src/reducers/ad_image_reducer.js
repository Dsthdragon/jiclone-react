export default function(state={}, action){
    switch(action.type){
        case 'GET_AD_IMAGES':
            return {...state, list:action.payload}
        case 'UPLOAD_AD_IMAGE':
            return {...state, upload:action.payload}
        case 'DEELTE_AD_IMAGE':
            return {...state, delete:action.payload}
        case 'MAIN_AD_IMAGE':
            return {...state, main:action.payload}
        default: return state;
    }
}