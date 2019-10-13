import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerClient } from '../../actions/clients';

class Register extends PureComponent {

    state = {
        email:"",
        password:"",
        first_name:"",
        last_name:"",
        phone:"",
        error:"",
        message:""
    }

    handleEmail = (event) => {
        this.setState({email:event.target.value})
    }
    handlePassword = (event) => {
        this.setState({password:event.target.value})
    }
    handleFirstname = (event) => {
        this.setState({first_name:event.target.value})
    }
    handleLastname = (event) => {
        this.setState({last_name:event.target.value})
    }
    handlePhone = (event) => {
        this.setState({phone:event.target.value})
    }

    submitRegister = (e) => {
        e.preventDefault();
        this.setState({error:'', message:''})
        let data = {
            email:this.state.email,
            password:this.state.password,
            first_name:this.state.first_name,
            last_name:this.state.last_name,
            phone:this.state.phone
        }

        this.props.dispatch(registerClient(data))
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.client !== this.props.client){
            if(prevProps.client.clientRegister !== this.props.client.clientRegister){
                if(this.props.client.clientRegister.status === 'failed')
                {
                    this.setState({error:this.props.client.clientRegister.message, message:''})
                } else {
                    this.setState({
                        email:"",
                        password:"",
                        first_name:"",
                        last_name:"",
                        phone:"",
                        error:"",
                        message:this.props.client.clientRegister.message
                    })
                }
            }
        }
    }

    render() {
        console.log(this.props)
        return (
            <div className="uk-flex uk-flex-center uk-margin-top">
                <div className="uk-width-1-1 uk-width-1-3@m">
                    <div>
                        <div className="uk-card uk-card-default uk-card-hover uk-flex uk-flex-column" >
                            <form onSubmit={this.submitRegister}>
                                <div className="uk-card-header uk-text-center">
                                    <h4 className="uk-text-bold">REGISTRATION</h4>
                                </div>
                                <div className="uk-text-danger">
                                    {
                                        this.state.error
                                    }
                                </div>
                                <div className="uk-text-success">
                                    {
                                        this.state.message
                                    }
                                </div>
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
                                    <div className="uk-margin">
                                        <div className="uk-width-1-1">
                                            <input
                                                type="text"
                                                onChange={this.handleFirstname}
                                                placeholder="Your First Name"
                                                value={this.state.first_name}
                                                className="uk-input"
                                            />
                                        </div>
                                    </div>
                                    <div className="uk-margin">
                                        <div className="uk-width-1-1">
                                            <input
                                                type="text"
                                                onChange={this.handleLastname}
                                                placeholder="Your Last Name (optional)"
                                                value={this.state.last_name}
                                                className="uk-input"
                                            />
                                        </div>
                                    </div>
                                    <div className="uk-margin">
                                        <div className="uk-width-1-1">
                                            <input
                                                type="phone"
                                                onChange={this.handlePhone}
                                                placeholder="Your Phone Number (optional)"
                                                value={this.state.phone}
                                                className="uk-input"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="uk-card-footer">
                                    <button className="uk-button uk-button-primary uk-width-1-1" type="submit">
                                        REGISTER 
                                    </button>
                                    <p>Already registered? <Link to="/login">Click Here!</Link></p>
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

export default connect(mapStateToProps)(Register);