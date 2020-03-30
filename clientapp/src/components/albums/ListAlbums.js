import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';

import {hostname} from '../../App'


export default class ListAlbums extends Component {
    constructor(props){
      super(props);
      this.state = {
        albums: []
      }
    }
    componentDidMount(){
      this.updateDatas()
    }

    updateDatas(){
      if(this.props.url !== undefined){
        axios.get("http://"+hostname+":9000/albums/"+this.props.url)
        .then(res => {
            this.setState({
              albums:res.data
            })
        })
      }
      else{
        axios.get("http://"+hostname+":9000/albums")
        .then(res => {
            this.setState({
              albums:res.data
            })
        })
      }
    }

    deleteItem(index){
      axios.delete("http://"+hostname+":9000/albums/"+index)
      .then(res => {
        if(res.data.ok === 1){
          this.updateDatas()
        }
      })
    }

    render(){
      const columns = [
        {
          Header: "Title",
          accessor: "title"
        },
        {
          Header: "Artist",
          accessor: "artist.name"
        },
        {
          Header: "Country",
          accessor: "artist.country"
        },
        {
          Header: "Year",
          accessor: "year"
        },
        {
          Header: "Genre",
          accessor: "genre"
        },
        {
          Header: "Actions",
          Cell:props=>{
            let link = "/albums/view/"+props.original._id
            return(
              <div>
                <Link to={link} className="btn btn-info">View it</Link>

                <button type="button" className="btn btn-danger" onClick={()=>{
                  this.deleteItem(props.original._id);
                }}>Remove</button>
              </div>
            )
          },
          sortable:false,
          filterable:false,
          width:170,
          maxWidth:170,
          minWidth:170
        }
      ]

      return (
        <div className="cointainer">
          <ReactTable
            columns={columns}
            data={this.state.albums}
            filterable
            defaultPageSize={10}
            noDataText={"Loading data..."}
          >
          </ReactTable>
        </div>
      );
    }
}
