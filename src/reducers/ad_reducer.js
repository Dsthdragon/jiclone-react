export default function(state={}, action){
    switch(action.type){
        case 'CREATE_AD':
            return {...state, create:action.payload}
        case 'UPDATE_AD':
            return {...state, update:action.payload}
        case 'GET_CLIENT_ADS':
            return {...state, list:action.payload}
        case 'GET_CATEGORY_ADS':
            return {...state, list:action.payload}
        case 'GET_AD':
            return {...state, single:action.payload}
        case 'GET_ADS':
            return {...state, list:action.payload}
        case 'FIND_ADS':
            return {...state, list:action.payload}
        default: return state;
    }
}