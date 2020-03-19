import React, { Component } from 'react';
//import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import cookie from 'js-cookie';

import {hostname} from '../../App'


export default class UsrProfile extends Component {
  constructor(props){
    super(props);
        this.state = {
            token: cookie.get('token'),
            usr_id: cookie.get('usr_id'),
            user: undefined
        }
    }

    componentDidMount(){
        axios.get("http://"+hostname+":9000/users/"+this.state.usr_id, {
        headers: { Authorization: "Bearer " + this.state.token }
        }).then(res => {
            this.setState({user:res.data});
        })
    }

    render(){
        if(this.state.user === undefined){
            return null
        }
        else{
            return (
                <div>
                    <h2>My Profile</h2>
                    <br/>
                    <h3>Name: {this.state.user.name}</h3>
                    <h4>Email: {this.state.user.email}</h4>
                    <Link to="/profile/edit" className="btn btn-info">Edit profile</Link>
                </div>
            );
        }
    }
}
