import React, { Component } from 'react';

import axios from 'axios'

import cookie from 'js-cookie';

import {hostname} from '../../App';
import AlertMessage from '../AlertMessage';

export default class EditArtist extends Component {
  constructor(props){
    super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCountry = this.onChangeCountry.bind(this);
        this.onChangeDesc = this.onChangeDesc.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            country: '',
            description: '',
            id: this.props.match.params.id,
            formClass : "",
            alert: undefined
        }
    }

    componentDidMount(){
        if (this.state.id !== undefined){
            axios.get("http://"+hostname+":9000/artists/"+this.state.id)
            .then(res => {
                this.setState({
                    name:res.data.name,
                    country:res.data.country,
                    description:res.data.description
                })
            })
        }


    }

    onChangeName(e){
        this.setState({
            name: e.target.value
        });
    }

    onChangeCountry(e){
        this.setState({
            country: e.target.value
        });
    }

    onChangeDesc(e){
        this.setState({
            description: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
        let artist = {
            name: this.state.name,
            country: this.state.country,
            description: this.state.description,
            postedBy: cookie.get("usr_id")
        }
        if (this.state.id !== undefined){
            axios.patch("http://"+hostname+":9000/artists/"+this.state.id, artist)
            .then(res => {
                this.setState({
                    alert:{
                        message:{
                                head: "Success!",
                                body: "The modification was successfull."
                            },
                        variant: "success"
                        },
                        formClass: "was-validated"
                });  
            });
        }
        else{
            axios.post("http://"+hostname+":9000/artists", artist)
            .then(res => {
                this.setState({
                    formClass: "was-validated",
                    id:res.data._id,
                    alert:{
                        message:{
                                head: "Success!",
                                body: "The saving was successfull."
                            },
                        variant: "success"
                        }
                });

                window.history.pushState("object or string", "Page Title", "/artists/edit/"+this.state.id);
            })
            .catch(error => {
                this.setState({
                    formClass: "was-validated",
                    alert:{
                        message:{
                                head: error.response.data,
                                body: "Please change that and try again!"
                            },
                        variant: "danger"
                        }
                })
            })

        }
    }

    render(){
      return (
            <div>
                {
                    this.state.alert ?
                        <AlertMessage message={this.state.alert.message}
                                                 variant={this.state.alert.variant}/>
                    : null
                }
                
                <h2>Edit artist</h2>
                <form onSubmit={this.onSubmit} className={this.state.formClass}>

                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangeName} required>
                        </input>
                        <div className="valid-feedback">Valid.</div>
                        <div className="invalid-feedback">Please fill out this field.</div>
                    </div>

                    <div className="form-group">
                        <label>Country: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.country}
                            onChange={this.onChangeCountry} required>
                        </input>
                        <div className="valid-feedback">Valid.</div>
                        <div className="invalid-feedback">Please fill out this field.</div>
                    </div>

                    <div className="form-group">
                        <label>Description: </label>
                        <textarea className="form-control"
                          rows="3"
                          value={this.state.description}
                          onChange={this.onChangeDesc} required>
                          </textarea>
                        <div className="valid-feedback">Valid.</div>
                        <div className="invalid-feedback">Please fill out this field.</div>
                    </div>

                    <button type="submit"
                            value="Edit the artist"
                            className="btn btn-primary">
                                Save
                        </button>
                </form>
            </div>
      );
    }
}
