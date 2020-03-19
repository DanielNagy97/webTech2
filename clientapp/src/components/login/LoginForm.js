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
            formClass : "",
            token: false
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
                console.log(res.data);
                cookie.set('usr_id', res.data.userID);
                cookie.set('token', res.data.token);
                this.setState({
                    token: res.data.token
                })
                window.location.reload();
            })

    }

    validate(e){
        this.setState({formClass: "was-validated"});
        const user = {
            email: this.state.email,
            password: this.state.password
        }

        let emptyInputs=[];
        Object.keys(user).map((key, i) => {
            if(user[key] === ""){
                emptyInputs.push(key);
            }
            return null
        })

        if(emptyInputs.length > 0){
            console.log(emptyInputs)
        }
    }

    render(){
        if(this.state.token){
            return <Redirect to="/" />
          }
      return (

            <div>
                <h2>Login</h2>
                <form onSubmit={this.onSubmit} className={this.state.formClass}>

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

                    <button type="submit"
                            value="Edit the artist"
                            className="btn btn-primary"
                            onClick={()=>{this.validate()}}>
                                Login
                    </button>
                    <Link to={"/register"} className="btn btn-info">Register</Link>
                </form>
            </div>
      );
    }
}
