import { combineReducers } from 'redux';
import client from './client_reducer';
import user from './user_reducer';
import category from './category_reducer';
import place from './place_reducer';
import region from './region_reducer';
import ad from './ad_reducer';
import review from './review_reducer';
import ad_image from './ad_image_reducer';

const rootReducer = combineReducers({
    client,
    user,
    region,
    category,
    place,
    ad,
    ad_image,
    review
});


export default rootReducer;