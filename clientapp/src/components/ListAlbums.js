import React, { Component } from 'react';
import axios from 'axios'


export default class ListAlbums extends Component {
  constructor(props){
    super(props);
    this.state = {
      albumTitles: []
    }
  }
    componentDidMount(){
      axios.get("http://localhost:9000/albums")
      .then(res => {
        if (res.data.length > 0){
          this.setState({
            albumTitles : res.data.map(album => album.title)
          })
        }
        console.log(this.state)
      });
    }

    render(){
      return (
        <div className="App">
          <h1>List of albums</h1>
          <ul>
          {
            this.state.albumTitles.map((title, index)=>{
              return(
                  <li key={index}>{title}</li>
              )
            })
          }
          </ul>

        </div>
      );
    }
}
