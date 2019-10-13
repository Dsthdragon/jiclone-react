import React, { Component } from 'react';
import { userAuth } from '../actions/users';
import { connect } from 'react-redux';

import SearchArea from '../components/Ads/search';

import { withCookies } from 'react-cookie'

export default function(ComposedClass, reload, hideSearch = false){
    class AuthCheck extends Component {
        state = {
            loading:true
        }

        componentDidMount(){
            this.props.dispatch(userAuth())
        }

        componentDidUpdate(prevProps){
            console.log(prevProps);

            console.log('Here');
            console.log(this.props)
            if(prevProps.user !== this.props.user){
                if(!this.props.user.auth.isAuth){
                    if(reload){
                        this.props.history.push('/login')
                    }
                    console.log('NO')
                } else {
                    if(reload === false) {
                        this.props.history.push('/profile')
                    }
                }
                if(this.state.loading){
                    this.setState({
                        loading:false
                    })
                }
            }
        }

        componentWillUnmount(){
            this.setState({
                loading: true
            })
        }

        render(){
            if(this.state.loading){
                return (
                    <div style={{
                        width: "100%",
                        height: "100%",
                        top: 0,
                        left: 0,
                        position: "fixed",
                        display: "block",
                        backgroundColor: "#fff",
                        zIndex: "991",
                        textAlign: "center",
                    }} >
                        <div id="loading-image" className="uk-position-center uk-spinner uk-icon" uk-spinner="ratio: 4.5"></div>
                    </div>
                )
            }
            return  (
                <div>
                    {
                        !hideSearch ? 
                            <div className="" style={{
                                    background: `url('/images/slider-1.jpg')`,backgroundSize: 'cover',
                                    backgroundPosition: 'center center',
                                    backgroundRepeat: 'no-repeat'
                                }}>
                                <div className="uk-container uk-flex uk-flex-bottom" style={{
                                    minHeight: '20rem',
                                }}>
                                    <div className="uk-section-default uk-section-xsmall uk-padding-small uk-margin-large-top uk-width-1-1">
                                        <SearchArea {...this.props} />
                                    </div>
                                </div>
                            </div>
                        : null
                    }
                    <ComposedClass {...this.props} user={this.props.user} />
                </div>
            )
        }
    }

    function mapStateToProps(state) {
        return {
            user:state.user
        }
    }
    return connect(mapStateToProps)(withCookies(AuthCheck))
}