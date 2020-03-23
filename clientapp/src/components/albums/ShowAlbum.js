import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import {hostname} from '../../App';

export default class ShowAlbum extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: this.props.match.params.id,
      album: undefined
    }
  }
  componentDidMount(){
    this.updateDatas()
  }

  updateDatas(){
    axios.get("http://"+hostname+":9000/albums/"+this.state.id)
    .then(res => {
        this.setState({
          album:res.data
        })
    })
  }
  render(){
    let link = "/albums/edit/"+this.state.id;
    console.log(this.state.album)
    if(this.state.album !== undefined){

      return (
        <div>
          <Link to={link} className="btn btn-info">Edit</Link>
          <h1>{this.state.album.title}</h1>
          <h2>{this.state.album.artist.name}</h2>
          <br/>
          <p>Genre: {this.state.album.genre}</p>
          <p>Style:</p>
          <ul>
          {
              this.state.album.style.map((style, key)=>{
                return <li key={key}>{style}</li>
              })
            }
          </ul>
          <p>Year: {this.state.album.year}</p>
          <p>Country: {this.state.album.artist.country}</p>
          <p>Tracklist:</p>
          <ul>
          {
              this.state.album.tracklist.map((track, key)=>{
                return <li key={key}>{track}</li>
              })
            }
          </ul>
        </div>
      );
    }
    else{
      return null
    }
  }
}
