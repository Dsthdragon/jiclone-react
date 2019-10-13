import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/layout';

import Home from './components/Home/home';
import Logout from './components/Profile/logout';
import Register from './containers/Client/register'
import Login from './containers/Client/login'
import Profile from './containers/Client/profile'
import PostAd from './containers/Client/post_ad'
import EditAd from './containers/Client/edit_ad'
import MyAd from './containers/Client/my_ad'


import Service from './containers/Service/service'
import Search from './containers/Search/search'
import Category from './containers/Category/category'

import Auth from './hoc/auth'

const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/profile" exact component={Auth(Profile, true, true)} />
                <Route path="/post-ad" exact component={Auth(PostAd, true, true)} />
                <Route path="/my-ad/:id" exact component={Auth(MyAd, true, true)} />
                <Route path="/my-ad/:id/edit" exact component={Auth(EditAd, true, true)} />
                <Route path="/service/:id/:title" exact component={Auth(Service, null)} />
                <Route path="/category/:id/:title" exact component={Auth(Category, null)} />
                <Route path="/search" exact component={Auth(Search, null)} />
                <Route path="/logout" exact component={Auth(Logout, true)} />
                <Route path="/register" exact component={Auth(Register, false, true)} />
                <Route path="/login" exact component={Auth(Login, false, true)} />
                <Route path="/" exact component={Auth(Home,null)} />
            </Switch>
        </Layout>
    )
}

export default Routes;