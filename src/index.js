import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie'
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';



import reducers  from './reducers'
import Routes from './routes';

library.add(fas, fab, far)

const createStoreWithMiddlesware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)


ReactDom.render(
    <Provider store={createStoreWithMiddlesware(reducers)}>
        <CookiesProvider>
            <BrowserRouter>
                <Routes/>
            </BrowserRouter>
        </CookiesProvider>
    </Provider>
    ,
    document.getElementById('root')
)