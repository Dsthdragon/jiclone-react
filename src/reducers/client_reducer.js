export default function(state={}, action){
    switch(action.type){
        case 'GET_CLIENTS':
            return {...state, list:action.payload}
        case 'REGISTER_CLIENT':
            return {...state, clientRegister:action.payload}
        case 'LOGIN_CLIENT':
            return {...state, clientLogin:action.payload}
        case 'UPLOAD_CLIENT_AVATAR':
            return {...state, clientAvatarUpload:action.payload}
        default: return state;
    }
}