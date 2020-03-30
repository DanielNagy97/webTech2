import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import cookie from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';

import './css/index.css';

import LoginForm from "./components/login/LoginForm";
import RegisterForm from "./components/login/RegisterForm";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import AlbumsPage from "./components/AlbumsPage";
import ArtistsPage from "./components/ArtistsPage";
import ListUsers from "./components/user/ListUsers"
import UsrProfile from "./components/user/UsrProfile"


export const hostname = window.location.hostname;

class App extends Component {
  render(){
    const token = cookie.get('token');
    if(!token){
      return (
        <Router>
          <div class="d-flex justify-content-center align-items-center">
            <div class="bg-light" style={{width:400, marginTop:100}}>
              <Route path="/" exact component={LoginForm} />
              <Route path="/register" exact component={RegisterForm} />
            </div>    
          </div>
        </Router>
      )
    }
    else{
      return (
        <Router>
          <NavBar />
          <div className="container">
          <Route path="/" exact component={AlbumsPage} />

            <Route path="/albums" component={AlbumsPage} />
            <Route path="/artists" component={ArtistsPage} />
            <Route path="/users" exact component={ListUsers} />

            <Route path="/profile" component={UsrProfile} />

            <Route path="/user/:id" exact component={UsrProfile} />

          </div>
          <Footer />
        </Router>
        );
      }
  }
}

export default App;
