import React, { Component } from 'react';
import { Link } from "react-router-dom";
import cookie from 'js-cookie'
import axios from 'axios';

import {hostname} from '../App'

import Logout from "./login/Logout.js"
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

export default class NavbarTop extends Component {
    constructor(props){
        super(props);    
        this.state = {
            usr_id: cookie.get('usr_id'),
            token: cookie.get('token'),
            usr_name: ""
        }
    }

    componentDidMount(){
        axios.get("http://"+hostname+":9000/users/"+this.state.usr_id, {
        headers: { Authorization: "Bearer " + this.state.token }
        }).then(res => {
            this.setState({
                usr_name:res.data.name
            });
        })
    }

    render(){

        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" id="navbar">
            <Navbar.Brand>
                <Link to="/" className="text-decoration-none text-reset">Home</Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">

                <Nav className="mr-auto">
                    <Link to="/albums" className="nav-link">Albums</Link>
                    <Link to="/artists" className="nav-link">Artists</Link>
                    <Link to="/users" className="nav-link">Users</Link>
                </Nav>

                <Nav>
                    <NavDropdown alignRight title={this.state.usr_name} id="collasible-nav-dropdown">

                        <NavDropdown.Item className="dropleft">
                            <Link to="/profile" className="text-decoration-none text-reset">Profile</Link>
                        </NavDropdown.Item>

                        <NavDropdown.Item>
                            <Link to="/profile/copies/add" className="text-decoration-none text-reset">Add new to Collection</Link>
                        </NavDropdown.Item>

                        <NavDropdown.Divider />
                        
                        <NavDropdown.Item>
                            <button className="btn btn-secondary btn-block" onClick={()=>Logout()}>Logout</button>
                        </NavDropdown.Item>

                    </NavDropdown>

                </Nav>

            </Navbar.Collapse>
            </Navbar>
      );
    }
}
