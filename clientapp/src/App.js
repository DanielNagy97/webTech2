import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./components/NavBar";
import ListAlbums from "./components/ListAlbums";
import ListArtists from "./components/ListArtists";
import EditAlbum from "./components/EditAlbum";
import EditArtist from "./components/EditArtist"
import ShowAlbum from "./components/ShowAlbum"
import Header from "./components/Header"
import Footer from "./components/Footer"


class App extends Component {
  render(){
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
        </div>
        <Footer />
      </Router>
    );
  }
}

export default App;
