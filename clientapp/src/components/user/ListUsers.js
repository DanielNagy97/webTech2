import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';

import {hostname} from '../../App'


export default class ListUsers extends Component {
    constructor(props){
      super(props);
      this.state = {
        users: []
      }
    }
    componentDidMount(){
      this.updateDatas()
    }

    updateDatas(){
      axios.get("http://"+hostname+":9000/users")
      .then(res => {
          this.setState({
            users:res.data
          })
      })
    }

    render(){
      const columns = [
        {
          Header: "Name",
          accessor: "name"
        },
        {
          Header: "Email",
          accessor: "email"
        },
        {
          Header: "Actions",
          Cell:props=>{
            let link = "/users/"+props.original._id
            return(
              <div>
                <Link to={link} className="btn btn-info">View Profile</Link>
              </div>
            )
          },
          sortable:false,
          filterable:false,
          width:120,
          maxWidth:120,
          minWidth:120
        }
      ]

      return (
        <div className="cointainer">
          <h2>List of users</h2>

          <ReactTable
            columns={columns}
            data={this.state.users}
            filterable
            defaultPageSize={10}
            noDataText={"Loading data..."}
          >
          </ReactTable>
        

        </div>
      );
    }
}
