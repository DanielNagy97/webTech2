import React, { Component } from 'react';
import { Link } from "react-router-dom";
import cookie from 'js-cookie'
import Logout from "./Logout.js"

export default class Navbar extends Component {

    render(){
        const token = cookie.get('token');
        if(token){
        console.log("logged in");
        }
        return (
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">

                <Link className="navbar-brand" to="/">Logo</Link>
                
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Albums</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/artists" className="nav-link">Artists</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/albums/add" className="nav-link">Add new album</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/artists/add" className="nav-link">Add new artist</Link>
                    </li>
                    <li className="nav-item">
                        <button type="button" className="btn btn-info" onClick={()=>Logout()}>Logout</button>
                    </li>
                    
                </ul>

                <div className="ml-auto">
                    <form className="form-inline" action="/#">
                        <input className="form-control mr-sm-2" type="text" placeholder="Search"></input>
                        <button className="btn btn-success" type="submit">Search</button>
                    </form>
                </div>
            </nav>
      );
    }
}
