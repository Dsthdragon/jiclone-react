export default function(state={}, action){
    switch(action.type){
        case 'USER_AUTH':
            return {...state, auth:action.payload}
        case 'USER_LOGOUT':
            return {...state, auth:action.payload}
        default: return state;
    }
}