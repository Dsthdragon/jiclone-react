import React from 'react'
import { TITLE } from '../../config';

export default () => {

    return (
        <div className="uk-card uk-card-default uk-margin-top">
            <footer className="uk-card-body">
				<div className="uk-container">
					<p className="uk-text-small uk-text-center">Copyright 2019 - {TITLE} </p>
				</div>
			</footer>
        </div>

    )
}