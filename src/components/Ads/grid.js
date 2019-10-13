import React from 'react';
import { Link } from 'react-router-dom';
import { ADS_MEDIA_URL  } from '../../config';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { displayStars } from '../../hoc/utils'

export default ({item, show_category= true}) => {
  return (
    <div className="uk-width-1-1 uk-width-1-3@m uk-width-1-4@l">
        
        <div className="divImageBox"
            style={{
                background: `url('${ADS_MEDIA_URL}${item.default_image.image}')`
            }}
            >
            <div className="uk-inline-clip uk-transition-toggle">
                {
                    show_category ?
                        <div className="uk-position-top uk-transition-slide-top-small uk-padding-small">
                            <h6 className="uk-margin-remove uk-text-truncate">
                                <Link to={`/category/${item.category.id}/${item.category.title}`} className="uk-label white-text" >
                                    <span>
                                        {item.category.title}
                                    </span>
                                </Link>
                            </h6>
                        </div>
                    : null
                }
                <div className="uk-position-bottom uk-transition-slide-bottom-small uk-overlay uk-overlay-primary">
                    <h6 className="uk-margin-remove uk-text-truncate">
                        <FontAwesomeIcon icon="map-marker" /> - {item.address}
                    </h6>
                </div>
            </div>
        </div>
    
        <div className="uk-section-muted uk-padding-small matchbox">
            <h5 className="uk-text-center">
                <Link to={`/service/${item.id}/${item.title}`} className="no-decoration">
                    <b>{item.title}</b>
                </Link>
            </h5>
            <p className="uk-text-center">
                {displayStars(item.rating)}
            </p>
        </div>
            <div uk-grid="" className="uk-text-center uk-grid-collapse">
                <div className="uk-width-1-2">
                    <Link to={`/service/${item.id}/${item.title}`} className="uk-width-1-1 uk-button uk-button-primary">
                        <FontAwesomeIcon icon="arrow-alt-circle-right" />
                    </Link>
                </div>
                <div className="uk-width-1-2">
                    <button className="uk-width-1-1 uk-button uk-button-primary pink">
                        <FontAwesomeIcon icon="heart" />
                    </button>
                </div>
            </div>
    </div>
  )
}
