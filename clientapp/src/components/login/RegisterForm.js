import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import {hostname} from '../../App';
import AlertMessage from '../AlertMessage';


export default class RegisterForm extends Component {
  constructor(props){
    super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            email: '',
            password: '',
            alert:""
        }
    }

    onChangeName(e){
        this.setState({
            name: e.target.value
        });
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
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }
        console.log(user)
        axios.post("http://"+hostname+":9000/users", user)
            .then(res => {
                console.log(res.data);
            })
            .catch(error => {
                console.log(error.response.data)
                this.setState({
                    alert: error.response.data
                })
            })
    }

    render(){
        if(this.state.isSuccess){
            return <Redirect to="/" />
        }
        return (
            <div>
                <h2>Register</h2>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text" placeholder="Name"
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangeName} required>
                        </input>
                        <div className="valid-feedback">Valid.</div>
                        <div className="invalid-feedback">Please fill out this field.</div>
                    </div>

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
                        this.state.alert ?
                            <p>{this.state.alert}</p>
                        : <br/>
                    }

                    <button type="submit"
                            value="Edit the artist"
                            className="btn btn-primary">
                                Register
                        </button>
                </form>
            </div>
      );
    }
}
