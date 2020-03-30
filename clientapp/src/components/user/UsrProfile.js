import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

import axios from 'axios';
import cookie from 'js-cookie';

import {hostname} from '../../App';

import ViewSubmitted from './ViewSubmitted'

import EditProfile from './EditProfile'

import ListCopies from "../copies/ListCopies"
import EditCopy from "../copies/EditCopy"


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
                <div class="container" style={{marginTop:30, marginBottom:30}}>
                    <div class="row">
                        <div class="col-sm-3">
                            <h2>User Profile</h2>
                            <br/>
                            <h3>Name: {this.state.user.name}</h3>
                            <h4>Email: {this.state.user.email}</h4>
                        </div>

                        <div class="col-sm-9">
                            <ViewSubmitted id={this.state.profile_id} />
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="container" style={{marginTop:30, marginBottom:30}}>
                    <div className="row">
                        <div className="col-sm-3">
                            <h2>My Profile</h2>
                            <br/>
                            <h3>Name: {this.state.user.name}</h3>
                            <h4>Email: {this.state.user.email}</h4>
                            <ul className="nav nav-pills flex-column">
                                <li className="nav-item">
                                    <Link to="/profile/edit" className="nav-link active">Edit profile</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/profile/" className="nav-link">View collection</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/profile/copies/add" className="nav-link">Add new copy</Link>
                                </li>
                            </ul>

                        </div>

                        <div className="col-sm-9">
                            <Route path={this.props.match.url+"/"} exact>
                                <ViewSubmitted id={this.state.profile_id} />
                            </Route>
                            <Route path={this.props.match.url+"/edit"} exact component={EditProfile} />

                            <Route path={this.props.match.url+"/copies"} exact component={ListCopies} />
                            <Route path={this.props.match.url+"/copies/add"} exact component={EditCopy} />
                            <Route path={this.props.match.url+"/copies/edit/:id"} exact component={EditCopy} />

                            
                        </div>
                    </div>
                </div>
            );
        }
    }
}
