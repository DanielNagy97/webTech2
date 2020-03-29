import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import cookie from 'js-cookie'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./components/NavBar";
import ListAlbums from "./components/albums/ListAlbums";
import ListArtists from "./components/artists/ListArtists";
import EditAlbum from "./components/albums/EditAlbum";
import EditArtist from "./components/artists/EditArtist"
import ShowAlbum from "./components/albums/ShowAlbum"
import Header from "./components/Header"
import Footer from "./components/Footer"
import LoginForm from "./components/login/LoginForm"
import RegisterForm from "./components/login/RegisterForm"
import UsrProfile from "./components/user/UsrProfile"
import EditProfile from "./components/user/EditProfile"
import ListUsers from "./components/user/ListUsers"
import ListCopies from "./components/copies/ListCopies"
import EditCopy from "./components/copies/EditCopy"

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
          <Header />
          <div className="container">
            <Route path="/" exact component={ListAlbums} />

            <Route path="/albums" exact component={ListAlbums} />
            <Route path="/albums/add" exact component={EditAlbum} />
            <Route path="/albums/edit/:id" exact component={EditAlbum} />
            <Route path="/album/:id" exact component={ShowAlbum} />

            <Route path="/artists" exact component={ListArtists} />
            <Route path="/artists/add" exact component={EditArtist} />
            <Route path="/artists/edit/:id" exact component={EditArtist} />

            <Route path="/profile" exact component={UsrProfile} />
            <Route path="/profile/edit" exact component={EditProfile} />
            <Route path="/users" exact component={ListUsers} />
            <Route path="/users/:id" exact component={UsrProfile} />

            <Route path="/copies" exact component={ListCopies} />
            <Route path="/copies/add" exact component={EditCopy} />
            <Route path="/copies/edit/:id" exact component={EditCopy} />
          </div>
          <Footer />
        </Router>
        );
      }
  }
}

export default App;
