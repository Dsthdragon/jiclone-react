export default function(state={}, action){
    switch(action.type){
        case 'GET_CATEGORIES':
            return {...state, list:action.payload}
        case 'GET_CATEGORY':
            return {...state, single:action.payload}
        default: return state;
    }
}