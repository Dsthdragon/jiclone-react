import React from 'react';

export default (props) => {
    const { cookies } = props
    
    cookies.remove('auth')
    props.history.push('/login')
    
    return (
        <div className="uk-container uk-text-center uk-padding">
            <h1>Sorry to see you go :(</h1>
        </div>
    )
}