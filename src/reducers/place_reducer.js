export default function(state={}, action){
    switch(action.type){
        case 'GET_PLACES_BY_REGION':
            return {...state, list:action.payload}
        case 'GET_PLACES':
            return {...state, list:action.payload}
        default: return state;
    }
}