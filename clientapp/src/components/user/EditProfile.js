import React, { Component } from 'react';
//import { Redirect } from 'react-router-dom';
import axios from 'axios';
import cookie from 'js-cookie';

import {hostname} from '../../App'


export default class EditProfile extends Component {
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
            formClass : "",
            isSuccess: false,
            token: cookie.get('token'),
            usr_id: cookie.get('usr_id')
        }
    }

    componentDidMount(){
        axios.get("http://"+hostname+":9000/users/"+this.state.usr_id, {
        headers: { Authorization: "Bearer " + this.state.token }
        }).then(res => {
            this.setState({
                name:res.data.name,
                email:res.data.email
            });
        })
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
        axios.patch("http://"+hostname+":9000/users/"+this.state.usr_id, user, {
            headers: { Authorization: "Bearer " + this.state.token }
            })
            .then(res => {
                console.log(res.data);
                this.setState({
                    isSuccess : true
                })
            })
    }

    validate(e){
        this.setState({formClass: "was-validated"});
        const user = {
            name: this.state.name,
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
        return (
            <div>
                <h2>Edit Profile</h2>
                <form onSubmit={this.onSubmit} className={this.state.formClass}>

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

                    <button type="submit"
                            value="Edit the artist"
                            className="btn btn-primary"
                            onClick={()=>{this.validate()}}>
                                Save Profile
                        </button>
                </form>
            </div>
      );
    }
}
