import React, { Component } from 'react';
import axios from 'axios'
import cookie from 'js-cookie';

import {hostname} from '../../App';

export default class EditCopy extends Component {
  constructor(props){
    super(props);
        this.onChangeAlbum = this.onChangeAlbum.bind(this);
        this.onChangeMadeIn = this.onChangeMadeIn.bind(this);
        this.onChangeReleaseYear = this.onChangeReleaseYear.bind(this);
        this.onChangeMediaCond = this.onChangeMediaCond.bind(this);
        this.onChangeSleeveCond = this.onChangeSleeveCond.bind(this);
        this.onChangeRating = this.onChangeRating.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            album:"",
            madeIn:"",
            releaseYear:"",
            mediaCond:"",
            sleeveCond:"",
            rating:"",
            id: this.props.match.params.id,
            formClass : "",
            conditions:[],
            albums:[]
        }
    }

    componentDidMount(){
        let albums = undefined;
        let conditions = [
            'Mint',
            'Near Mint',
            'Very Good Plus',
            'Very Good',
            'Good Plus',
            'Good',
            'Fair',
            'Poor'
        ]
        axios.get("http://"+hostname+":9000/albums/")
            .then(res => {
                console.log(res.data)
                albums = res.data
                this.setState({
                    album:albums[0]._id,
                    albums:albums,
                    conditions: conditions,
                    mediaCond: conditions[0],
                    sleeveCond: conditions[0]
                })
            })

        if (this.state.id !== undefined){
            axios.get("http://"+hostname+":9000/copies/"+this.state.id)
            .then(res => {
                console.log(res.data)
                this.setState({
                    album:res.data.album._id,
                    madeIn:res.data.madeIn,
                    releaseYear:res.data.releaseYear,
                    mediaCond:res.data.mediaCond,
                    sleeveCond:res.data.sleeveCond,
                    rating:res.data.rating,
                })
            })
        }
    }

    onChangeAlbum(e){
        this.setState({
            album: e.target.value
        });
    }

    onChangeMadeIn(e){
        this.setState({
            madeIn: e.target.value
        });
    }

    onChangeReleaseYear(e){
        this.setState({
            releaseYear: e.target.value
        });
    }

    onChangeMediaCond(e){
        this.setState({
            mediaCond: e.target.value
        });
    }

    onChangeSleeveCond(e){
        this.setState({
            sleeveCond: e.target.value
        });
    }

    onChangeRating(e){
        this.setState({
            rating: e.target.value
        });
    }


    onSubmit(e){
        e.preventDefault();
        let copy = {
            album: this.state.album,
            madeIn: this.state.madeIn,
            releaseYear: this.state.releaseYear,
            mediaCond: this.state.mediaCond,
            sleeveCond: this.state.sleeveCond,
            rating: this.state.rating,
            owner: cookie.get("usr_id")
        }
        console.log(copy)
        if (this.state.id !== undefined){
            axios.patch("http://"+hostname+":9000/copies/"+this.state.id, copy)
            .then(res => console.log(res.data));
        }
        else{
            axios.post("http://"+hostname+":9000/copies", copy)
            .then(res => {
                console.log(res.data)
                this.setState({
                    id:res.data._id
                });
                this.props.history.push('/copies/edit/'+this.state.id);          
            })
        }
    }

    render(){
        console.log(this.state)
      return (
            <div>
                <h2>Edit Copy</h2>
                <form onSubmit={this.onSubmit} className={this.state.formClass}>

                <div className="form-group w-75">
                        <label>Album: </label>
                        <select ref="userInput"
                            required className="form-control"
                            value={this.state.album}
                            onChange={this.onChangeAlbum}>
                                {
                                    this.state.albums.map( function(album, key){
                                        return(
                                            <option key={key}
                                                value={album._id}>{album.title} ({album.artist.name})</option>
                                        )
                                    })
                                }
                        </select>
                        <div className="valid-feedback">Valid.</div>
                        <div className="invalid-feedback">Please fill out this field.</div>
                    </div>

                    <div className="form-group">
                        <label>Made in: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.madeIn}
                            onChange={this.onChangeMadeIn} required>
                        </input>
                        <div className="valid-feedback">Valid.</div>
                        <div className="invalid-feedback">Please fill out this field.</div>
                    </div>

                    <div className="form-group w-50">
                        <label>Release year: </label>
                        <input type="number"
                            className="form-control"
                            value={this.state.releaseYear}
                            onChange={this.onChangeReleaseYear} required>
                        </input>
                        <div className="valid-feedback">Valid.</div>
                        <div className="invalid-feedback">Please fill out this field.</div>
                    </div>

                    <div className="form-group w-75">
                        <label>Media Condition:: </label>
                        <select ref="userInput"
                            className="form-control"
                            value={this.state.mediaCond}
                            onChange={this.onChangeMediaCond} required>
                                {
                                    this.state.conditions.map( function(cond){
                                        return(
                                            <option key={cond}
                                                value={cond}>{cond}</option>
                                        )
                                    })
                                }
                        </select>
                        <div className="valid-feedback">Valid.</div>
                        <div className="invalid-feedback">Please fill out this field.</div>
                    </div>

                    <div className="form-group w-75">
                        <label>Sleeve Condition:: </label>
                        <select ref="userInput"
                            className="form-control"
                            value={this.state.sleeveCond}
                            onChange={this.onChangeSleeveCond} required>
                                {
                                    this.state.conditions.map( function(cond){
                                        return(
                                            <option key={cond}
                                                value={cond}>{cond}</option>
                                        )
                                    })
                                }
                        </select>
                        <div className="valid-feedback">Valid.</div>
                        <div className="invalid-feedback">Please fill out this field.</div>
                    </div>

                    <div className="form-group w-50">
                        <label>Rating (1-5): </label>
                        <input type="number"
                            className="form-control"
                            value={this.state.rating}
                            onChange={this.onChangeRating} required>
                        </input>
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

