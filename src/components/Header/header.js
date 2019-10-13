import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {

    search = (e) => {
        e.preventDefault();
    }

    items = [
        {
            class:"",
            text:'Home',
            link:'/',
            restricted:false
        },
        {
            class:"",
            text:'Profile',
            link:'/profile',
            restricted:true
        },
        {
            class:"",
            text:'Sign In',
            link:'/login',
            restricted:false,
            exclude:true
        },
        {
            class:"",
            text:'Registration',
            link:'/register',
            restricted:false,
            exclude:true
        },
        {
            class:"",
            text:'Logout',
            link:'/logout',
            restricted:true
        },
        {
            class:"uk-button uk-button-primary",
            text:'POST AD',
            link:'/post-ad',
            restricted:false
        },
    ]

    element = (item, i) => (
        <li key={i}>
            <Link to={item.link}>
                <div className={item.class}>
                    {item.text}
                </div>
            </Link>
        </li>
    )

    showItems = () => (
        this.props.user.auth?
            this.items.map((item, i) => {
                if(this.props.user.auth.isAuth){
                    return !item.exclude ? 
                        this.element(item, i)
                    : null
                } else {
                    return !item.restricted ?
                        this.element(item, i)
                    : null
                }
            })
        :null
    )

    render() {
        return (
            <header data-uk-sticky="show-on-up: true; animation: uk-animation-slide-top" className="uk-sticky">
                <div className="uk-navbar-container" style={{
                    backgroundColor: "#FFF",
                    borderBottom: "1px solid"
                }}>
                    <nav className="uk-container" uk-navbar="True">
                        <div className="uk-navbar-left">
                            <ul className="uk-navbar-nav">
                                <li className="uk-active">
                                    <Link to="/">
                                        <img src="/logo192.png" alt="logo" style={{
                                            height: '50px'
                                        }} />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="uk-navbar-right">
                            <ul className="uk-navbar-nav">
                                {this.showItems()}
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>
        );
    }
}

function mapStateToProps(state){
    return {
        user:state.user
    }
}

export default connect(mapStateToProps)(Header);