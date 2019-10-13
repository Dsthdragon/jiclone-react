export default function(state={}, action){
    switch(action.type){
        case 'CREATE_REVIEW':
            return {...state, create:action.payload}
        case 'CHECK_REVIEW':
            return {...state, check:action.payload}
        case 'SERVICE_REVIEWS':
            return {...state, list:action.payload}
        default: return state;
    }
}