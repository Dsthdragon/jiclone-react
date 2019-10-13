import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export function displayStars (count)  {
    return [1,2,3,4,5].map((item, i) =>{
        if(item <= count){
            return <FontAwesomeIcon icon="star" className="orange-text text-lighten-3" key={i} />
        }
        return <FontAwesomeIcon icon="star" className="grey-text text-lighten-3" key={i} />
    })
}