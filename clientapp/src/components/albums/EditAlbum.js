import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import {hostname} from '../../App';


export default class AddAlbum extends Component {
    constructor(props){
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeArtist = this.onChangeArtist.bind(this);
        this.onChangeYear = this.onChangeYear.bind(this);
        this.onChangeGenre = this.onChangeGenre.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            title: '',
            artist: '',
            year: 0,
            genre: '',
            style: [''],
            tracklist: [''],
            artists: [],
            genres: [],
            id: this.props.match.params.id,
            formClass : ""
        }
    }

    componentDidMount(){
        axios.get("http://"+hostname+":9000/artists")
        .then(res => {
            if (res.data.length > 0){
                console.log(res.data[0]._id)
                this.setState({
                    artists : res.data,
                    artist : res.data[0]._id,
                    genres: [   "Avant-garde",
                                "Blues",
                                "Caribbean and Caribbean-influenced",
                                "Comedy",
                                "Country",
                                "Easy listening",
                                "Electronic",
                                "Flamenco",
                                "Folk",
                                "Hip hop",
                                "Jazz",
                                "Latin",
                                "Pop",
                                "R&B",
                                "Soul",
                                "Rock"],
                    genre: "Rock",
                })
            }})
        
        if (this.state.id !== undefined){
            axios.get("http://"+hostname+":9000/albums/"+this.state.id)
            .then(res => {
                this.setState({
                title: res.data.title,
                artist: res.data.artist._id,
                year: res.data.year,
                genre: res.data.genre,
                style: res.data.style,
                tracklist: res.data.tracklist,
                })
            })
        }

    }

    onChangeTitle(e){
        this.setState({
            title: e.target.value
        });
    }

    onChangeArtist(e){
        this.setState({
            artist: e.target.value
        });
    }

    onChangeYear(e){
        this.setState({
            year: e.target.value
        });
    }

    onChangeGenre(e){
        this.setState({
            genre: e.target.value
        });
    }

    addStyle(){
        this.setState({style: [...this.state.style,""]})
    }

    handleStyeChange(e, index){
        let se = this.state.style
        se[index] = e.target.value
        this.setState({style: se})
    }

    handleStyleRemove(e, index){
        let se = this.state.style
        se.splice(index, 1)
        this.setState({style: se})
    }

    addTrack(){
        this.setState({tracklist: [...this.state.tracklist,""]})
    }

    handleTrackChange(e, index){
        let se = this.state.tracklist
        se[index] = e.target.value
        this.setState({tracklist: se})
    }

    handleTrackRemove(e, index){
        let se = this.state.tracklist
        se.splice(index, 1)
        this.setState({tracklist: se})
    }

    onSubmit(e){
        e.preventDefault();
        const album = {
            title: this.state.title,
            artist: this.state.artist,
            year: this.state.year,
            genre: this.state.genre,
            style: this.state.style,
            tracklist: this.state.tracklist,
            postedBy: cookie.get("usr_id")
        }
        console.log(album)
        axios.patch("http://"+hostname+":9000/albums/"+this.state.id, album)
            .then(res => console.log(res.data));

        if (this.state.id !== undefined){
            axios.patch("http://"+hostname+":9000/albums/"+this.state.id, album)
            .then(res => console.log(res.data));
        }
        else{
            axios.post("http://"+hostname+":9000/albums", album)
            .then(res => {
                console.log(res.data)
                this.setState({
                    id:res.data._id
                })
                this.props.history.push('/albums/edit/'+this.state.id)
            })
    
        }
    }

    render(){
        console.log(this.state)
        console.log(this.state.artists)
      return (
            <div>
                <h2>Edit album</h2>
                <form onSubmit={this.onSubmit} className={this.state.formClass}>

                    <div className="form-group">
                        <label>Title: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.title}
                            onChange={this.onChangeTitle} required>
                        </input>
                        <div className="valid-feedback">Valid.</div>
                        <div className="invalid-feedback">Please fill out this field.</div>
                    </div>

                    <div className="form-group w-75">
                        <label>Artist: </label>
                        <select ref="userInput"
                            required className="form-control"
                            value={this.state.artist}
                            onChange={this.onChangeArtist}>
                                {
                                    this.state.artists.map( function(artist, key){
                                        return(
                                            <option key={key}
                                                value={artist._id}>{artist.name}</option>
                                        )
                                    })
                                }
                        </select>
                        <div className="valid-feedback">Valid.</div>
                        <div className="invalid-feedback">Please fill out this field.</div>
                    </div>

                    <div className="form-group w-50">
                        <label>Year: </label>
                        <input type="number"
                            className="form-control"
                            value={this.state.year}
                            onChange={this.onChangeYear} required>
                        </input>
                        <div className="valid-feedback">Valid.</div>
                        <div className="invalid-feedback">Please fill out this field.</div>
                    </div>

                    <div className="form-group w-75">
                        <label>Genre: </label>
                        <select ref="userInput"
                            className="form-control"
                            value={this.state.genre}
                            onChange={this.onChangeGenre} required>
                                {
                                    this.state.genres.map( function(genre){
                                        return(
                                            <option key={genre}
                                                value={genre}>{genre}</option>
                                        )
                                    })
                                }
                        </select>
                        <div className="valid-feedback">Valid.</div>
                        <div className="invalid-feedback">Please fill out this field.</div>
                    </div>

                    <div className="form-group">
                        <label>Style: </label>
                        {
                            this.state.style.map((style, index)=>{
                                return(
                                    <div key={index}>
                                        <div className="input-group">
                                        <input className="form-control"
                                            value={style}
                                            onChange={(e)=>this.handleStyeChange(e, index)} required></input>
                                            <span style={{width: 10}}></span>
                                            <button type="button"
                                                className="btn btn-info"
                                                onClick={(e)=>this.handleStyleRemove(e, index)}>Remove</button>
                                        </div>
                                        <br/>
                                    </div>
                                    
                                )
                            })
                        }
                        <button type="button"
                            className="btn btn-secondary"
                            onClick={(e)=>this.addStyle(e)}>Add Style</button>
                    </div>

                    <div className="form-group">
                        <label>Tracklist: </label>
                        {
                            this.state.tracklist.map((track, index)=>{
                                return(
                                    <div key={index}>
                                    <div className="input-group">
                                        <span>{index+1}. </span>
                                        <input className="form-control"
                                            value={track}
                                            onChange={(e)=>this.handleTrackChange(e, index)} required></input>
                                        <span style={{width: 10}}></span>
                                        <button type="button"
                                            className="btn btn-info"
                                            onClick={(e)=>this.handleTrackRemove(e, index)}>Remove</button>
                                    </div>
                                    <br/>
                                    </div>
                                )
                            })
                        }
                        <button type="button"
                            className="btn btn-secondary"
                            onClick={(e)=>this.addTrack(e)}>Add Track</button>
                    </div>

                    <button type="submit"
                            value="Add a new album"
                            className="btn btn-primary"
                            onClick={()=>{this.setState({formClass: "was-validated"})}}>
                                Save
                        </button>
                </form>

            </div>
       
      );
    }
}
