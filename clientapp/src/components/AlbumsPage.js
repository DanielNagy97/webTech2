import React, { Component } from 'react';

import { Link, Route } from 'react-router-dom';

import ListAlbums from './albums/ListAlbums';
import EditAlbum from "./albums/EditAlbum";
import ShowAlbum from "./albums/ShowAlbum";
import Header from "./Header";


export default class AlbumsPage extends Component {
  constructor(props){
    super(props);
        this.state = {
            header : [
              {
                im:require('../images/vinyl.jpg'),
                alt:"First slide",
                title:"First slide",
                desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              },
              {
                im:require("../images/vinyl2.jpg"),
                alt:"Second slide",
                title:"Second slide",
                desc:"Nam accumsan fermentum massa, id cursus erat iaculis sed."
              },
              {
                im:require("../images/vinyl3.jpg"),
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
                <h2>Albums</h2>
                <p>Lorem ipsum dolor sit ame.</p>
                <ul className="nav nav-pills flex-column">
                  <li className="nav-item">
                    <Link to="/albums" className="nav-link active">View all</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/albums/add" className="nav-link">Add new album</Link>
                  </li>
                </ul>
                <img src={require('../images/vinyl-icon.png')} alt="" style={{width:'40%'}}></img>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer varius mollis tempus. In magna nulla, consequat ut nisl sed, gravida dictum leo. Nam imperdiet scelerisque mauris, et tempor augue tristique eget.</p>
                

                <hr className="d-sm-none"></hr>
              </div>
              <div className="col-sm-9">

                <Route path={this.props.match.url+"/"} exact component={ListAlbums} />
                <Route path={this.props.match.url+"/add"} exact component={EditAlbum} />
                <Route path={this.props.match.url+"/edit/:id"} exact component={EditAlbum} />
                <Route path={this.props.match.url+"/view/:id"} exact component={ShowAlbum} />
                
              </div>
            </div>
          </div>

        </div>
        

      );
    }
}
