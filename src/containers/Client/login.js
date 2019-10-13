import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginClient } from '../../actions/clients';

class Login extends PureComponent {

    state = {
        email:"",
        password:"",
        error:"",
        message:""
    }

    handleEmail = (event) => {
        this.setState({email:event.target.value})
    }
    handlePassword = (event) => {
        this.setState({password:event.target.value})
    }

    submitLogin = (e) => {
        e.preventDefault();
        this.setState({error:'', message:''})
        let data = {
            email:this.state.email,
            password:this.state.password,
        }

        this.props.dispatch(loginClient(data))
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.client !== this.props.client) {
            if(prevProps.client.clientLogin !== this.props.client.clientLogin){
                if(this.props.client.clientLogin.status === 'failed')
                {
                    this.setState({error:this.props.client.clientLogin.message, message:''})
                } else {
                    this.setState({
                        email:"",
                        password:"",
                        error:"",
                        message:this.props.client.clientLogin.message
                    })
                    this.props.history.push('/profile')
                }
            }
        }
    }

    showOutput = () => {
        if(this.state.error){
            return (
                <div className="uk-alert-danger" uk-alert="">
                    <p>

                        {
                            this.state.error
                        }
                    </p>
                </div>
            )
        }
        if(this.state.message){
            return (
                <div className="uk-alert-success" uk-alert="">
                    <p>
                        {
                            this.state.message
                        }
                    </p>
                </div>
            )
        }
        return null;
    }

    render() {
        return (
            <div className="uk-flex uk-flex-center uk-margin-top">
                <div className="uk-width-1-1 uk-width-1-3@m">
                    <div>
                        <div className="uk-card uk-card-default uk-card-hover uk-flex uk-flex-column" >
                            <form onSubmit={this.submitLogin}>
                                <div className="uk-card-header uk-text-center">
                                    <h4 className="uk-text-bold">LOGIN</h4>
                                </div>
                                {this.showOutput()}
                                <div className="uk-card-body">
                                    <div className="uk-margin">
                                        <div className="uk-width-1-1">
                                            <input
                                                type="email"
                                                onChange={this.handleEmail}
                                                placeholder="Your Email Address"
                                                value={this.state.email}
                                                className="uk-input"
                                            />
                                        </div>
                                    </div>
                                    <div className="uk-margin">
                                        <div className="uk-width-1-1">
                                            <input
                                                type="password"
                                                onChange={this.handlePassword}
                                                placeholder="Your Password Address"
                                                value={this.state.password}
                                                className="uk-input"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="uk-card-footer">
                                    <button className="uk-button uk-button-primary uk-width-1-1" type="submit">
                                        LOGIN 
                                    </button>
                                    <p>New here? <Link to="/register">Click Here!</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state){
    return{
        client:state.client
    }
}

export default connect(mapStateToProps)(Login);