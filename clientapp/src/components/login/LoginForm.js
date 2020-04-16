import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import cookie from 'js-cookie';

import {hostname} from '../../App'


export default class LoginForm extends Component {
  constructor(props){
    super(props);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            password: '',
            token: false,
            error: ""
        }
    }

    onChangeEmail(e){
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e){
        this.setState({
            password: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post("http://"+hostname+":9000/auth", user)
            .then(res => {
                cookie.set('usr_id', res.data.userID);
                cookie.set('token', res.data.token);
                this.setState({
                    token: res.data.token
                })
                window.location.reload();
            })
            .catch(error => {
                this.setState({
                    error: error.response.data
                })
            })
    }

    render(){
        if(this.state.token){
            return <Redirect to="/" />
          }
      return (

            <div>
                <h2>Login</h2>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label>Email: </label>
                        <input type="email" placeholder="example@email.com"
                            className="form-control"
                            value={this.state.email}
                            onChange={this.onChangeEmail} required>
                        </input>
                        <div className="valid-feedback">Valid.</div>
                        <div className="invalid-feedback">Please fill out this field.</div>
                    </div>

                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password" placeholder="Password"
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword} required>
                        </input>
                        <div className="valid-feedback">Valid.</div>
                        <div className="invalid-feedback">Please fill out this field.</div>
                    </div>
                    {
                        (this.state.error !=="" ? <p>{this.state.error}</p>:<br/>)
                    }

                    <button type="submit"
                            value="Edit the artist"
                            className="btn btn-primary">
                                Login
                    </button>
                    <Link to={"/register"} className="btn btn-info">Register</Link>
                </form>
            </div>
      );
    }
}
