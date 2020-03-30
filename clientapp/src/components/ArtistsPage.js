import React, { Component } from 'react';

import { Link, Route } from 'react-router-dom';

import ListArtists from './artists/ListArtists';
import EditArtist from "./artists/EditArtist"
import Header from "./Header";


export default class ArtistsPage extends Component {
  constructor(props){
    super(props);
        this.state = {
            header : [
              {
                im:require('../images/artist1.jpg'),
                alt:"First slide",
                title:"First slide",
                desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              },
              {
                im:require("../images/artist2.jpg"),
                alt:"Second slide",
                title:"Second slide",
                desc:"Nam accumsan fermentum massa, id cursus erat iaculis sed."
              },
              {
                im:require("../images/artist3.jpg"),
                alt:"Third slide",
                title:"Third slide",
                desc:"Mauris aliquam eros in pellentesque congue."
              }
            ]
        }
    }

    render(){

      return (
        <div>
          <Header data={this.state.header}/>
          <div className="container" style={{marginTop:30, marginBottom:30}}>
          <div className="row">
            <div className="col-sm-3">
              <h2>Artists</h2>
              <p>Lorem ipsum dolor sit ame.</p>
              <ul className="nav nav-pills flex-column">
                <li className="nav-item">
                  <Link to="/artists" className="nav-link active">View all</Link>
                </li>
                <li className="nav-item">
                  <Link to="/artists/add" className="nav-link">Add new artist</Link>
                </li>
              </ul>
              <img src={require('../images/band.png')} alt="" style={{width:'70%'}}></img>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer varius mollis tempus. In magna nulla, consequat ut nisl sed, gravida dictum leo. Nam imperdiet scelerisque mauris, et tempor augue tristique eget.</p>
              <hr className="d-sm-none"></hr>
            </div>
            <div className="col-sm-9">

              <Route path="/artists" exact component={ListArtists} />
              <Route path="/artists/add" exact component={EditArtist} />
              <Route path="/artists/edit/:id" exact component={EditArtist} />
              
            </div>
          </div>
        </div>
      </div>
      );
    }
}
