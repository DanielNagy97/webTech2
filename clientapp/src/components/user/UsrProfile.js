import React, { Component } from 'react';
//import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import cookie from 'js-cookie';

import {hostname} from '../../App';

import ViewSubmitted from './ViewSubmitted'


export default class UsrProfile extends Component {
  constructor(props){
    super(props);
        this.state = {
            token: cookie.get('token'),
            usr_id: cookie.get('usr_id'),
            user: undefined,
            profile_id: '',
            logged_user: false
        }
    }

    componentDidMount(){
        let user_id = this.state.usr_id;
        let logged_user = false;
        if(this.props.match.params.id !== undefined && this.props.match.params.id !== user_id){
            user_id = this.props.match.params.id;
        }else{
            logged_user = true;
        }
        axios.get("http://"+hostname+":9000/users/"+user_id, {
        headers: { Authorization: "Bearer " + this.state.token }
        }).then(res => {
            this.setState({
                user:res.data,
                profile_id:user_id,
                logged_user:logged_user
            });
        })
    }

    render(){
        console.log(this.state.profile_id)
        if (this.state.user === undefined && this.state.profile_id ===""){
            return null
        }
        else if (!this.state.logged_user){
            return (
                <div>
                    <h2>Profile</h2>
                    <br/>
                    <h3>Name: {this.state.user.name}</h3>
                    <h4>Email: {this.state.user.email}</h4>
                    <ViewSubmitted id={this.state.profile_id} />
                </div>
            );
        }
        else {
            return (
                <div>
                    <h2>My Profile</h2>
                    <br/>
                    <h3>Name: {this.state.user.name}</h3>
                    <h4>Email: {this.state.user.email}</h4>
                    <Link to="/profile/edit" className="btn btn-info">Edit profile</Link>
                    <ViewSubmitted id={this.state.profile_id} />
                </div>
            );
        }
    }
}
