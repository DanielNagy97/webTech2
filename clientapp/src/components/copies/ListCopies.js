import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import cookie from 'js-cookie';

import {hostname} from '../../App'


export default class ListCopies extends Component {
    constructor(props){
      super(props);
      this.state = {
        copies: []
      }
    }
    componentDidMount(){
      this.updateDatas()
    }

    updateDatas(){
      if(this.props.url !== undefined){
        axios.get("http://"+hostname+":9000/copies/"+this.props.url)
        .then(res => {
            this.setState({
              copies:res.data
            })
        })
      }
      else{
        axios.get("http://"+hostname+":9000/copies")
        .then(res => {
            this.setState({
              copies:res.data
            })
        })
      }
    }

    deleteItem(index){
      axios.delete("http://"+hostname+":9000/copies/"+index)
      .then(res => {
        if(res.data.ok === 1){
          this.updateDatas()
        }
      })
    }

    render(){
        console.log(this.state)
      const columns = [
        {
          Header: "Album",
          accessor: "album.title"
        },
        {
            Header: "Artist",
            accessor: "album.artist.name"
        },
        {
            Header: "Made in",
            accessor: "madeIn"
        },
        {
          Header: "Release Year",
          accessor: "releaseYear"
        },
        {
          Header: "Media",
          accessor: "mediaCond"
        },
        {
          Header: "Sleeve",
          accessor: "sleeveCond"
        },
        {
            Header: "Rating",
            accessor: "rating"
        },
        {
          Header: "Actions",
          Cell:props=>{
            let link = "/copies/edit/"+props.original._id;
            let loggedInUSER = cookie.get("usr_id");
            if(props.original.owner._id === loggedInUSER){
                return(
                    <div>
                      <Link to={link} className="btn btn-info">Edit</Link>
                      <button type="button" className="btn btn-danger" onClick={()=>{
                        this.deleteItem(props.original._id);
                      }}>Remove</button>
                    </div>
                  )
            }
            else{
                return(
                <span>Owned by {props.original.owner.name}</span>
                )
            }
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
            data={this.state.copies}
            filterable
            defaultPageSize={5}
            noDataText={"Loading data..."}
          >
          </ReactTable>
        </div>
      );
    }
}
