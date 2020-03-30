import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import cookie from 'js-cookie';

import {hostname} from '../../App';

export default class ListArtists extends Component {
    constructor(props){
      super(props);
      this.state = {
        artists: [],
        token: cookie.get('token')
      }
    }
    componentDidMount(){
      this.updateDatas()
    }

    updateDatas(){
      if(this.props.url !== undefined){
        axios.get("http://"+hostname+":9000/artists/"+this.props.url)
        .then(res => {
            this.setState({
              artists:res.data
            })
        })
      }
      else{
        axios.get("http://"+hostname+":9000/artists")
        .then(res => {
            this.setState({
              artists:res.data
            })
        })
      }

    }

    deleteItem(index){
      axios.delete("http://"+hostname+":9000/artists/"+index)
      .then(res => {
        if(res.data.ok === 1){
          this.updateDatas()
        }
      })
    }

    render(){
      const columns = [
        {
          Header: "Name",
          accessor: "name"
        },
        {
          Header: "Country",
          accessor: "country"
        },
        {
          Header: "Description",
          accessor: "description",
          sortable:false,
          filterable:false
        },
        {
          Header: "Actions",
          Cell:props=>{
            let link = "/artists/edit/"+props.original._id
            return(
              <div>
                <Link to={link} className="btn btn-info">Edit</Link>

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
      console.log(this.state.artists)
      return (
        <div className="cointainer">
          <ReactTable
            columns={columns}
            data={this.state.artists}
            filterable
            defaultPageSize={10}
            noDataText={"Loading data..."}
          >
          </ReactTable>
        </div>
      );
    }
}
