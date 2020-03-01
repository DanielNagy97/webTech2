import React, { Component } from 'react';
import axios from 'axios'


export default class AddAlbum extends Component {
    constructor(props){
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeArtist = this.onChangeArtist.bind(this);
        this.onChangeCountry = this.onChangeCountry.bind(this);
        this.onChangeYear = this.onChangeYear.bind(this);
        this.onChangeGenre = this.onChangeGenre.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            title: '',
            artist: '',
            country: '',
            year: 0,
            genre: '',
            style: [''],
            tracklist: [''],
            artists: [],
            genres: [],
            id: this.props.match.params.id
        }
    }

    componentDidMount(){
        axios.get("http://localhost:9000/albums/"+this.state.id)
        .then(res => {
            this.setState({
              title: res.data.title,
              artist: res.data.artist,
              country: res.data.country,
              year: res.data.year,
              genre: res.data.genre,
              style: res.data.style,
              tracklist: res.data.tracklist,
            })
        })
        console.log(this.state)
        axios.get("http://localhost:9000/artists")
            .then(res => {
                if (res.data.length > 0){
                    this.setState({
                        artists : res.data.map(artist => artist.name),
                    })
                }})
        
        this.setState({
            genres: ["Avant-garde",
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
            genre: "Rock"
        })
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

    onChangeCountry(e){
        this.setState({
            country: e.target.value
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
            country: this.state.country,
            year: this.state.year,
            genre: this.state.genre,
            style: this.state.style,
            tracklist: this.state.tracklist
        }
        console.log(album)
        axios.patch("http://localhost:9000/albums/"+this.state.id, album)
            .then(res => console.log(res.data));
    }

    render(){
      return (
            <div>
                <h2>Edit album</h2>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label>Title: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.title}
                            onChange={this.onChangeTitle}>
                        </input>
                    </div>

                    <div className="form-group w-50">
                        <label>Artist: </label>
                        <select ref="userInput"
                            required className="form-control"
                            value={this.state.artist}
                            onChange={this.onChangeArtist}>
                                {
                                    this.state.artists.map( function(artist, key){
                                        return(
                                            <option key={key}
                                                value={artist}>{artist}</option>
                                        )
                                    })
                                }
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Country: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.country}
                            onChange={this.onChangeCountry}>
                        </input>
                    </div>

                    <div className="form-group w-50">
                        <label>Year: </label>
                        <input type="number"
                            className="form-control"
                            value={this.state.year}
                            onChange={this.onChangeYear}>
                        </input>
                    </div>

                    <div className="form-group w-50">
                        <label>Genre: </label>
                        <select ref="userInput"
                            required className="form-control"
                            value={this.state.genre}
                            onChange={this.onChangeGenre}>
                                {
                                    this.state.genres.map( function(genre){
                                        return(
                                            <option key={genre}
                                                value={genre}>{genre}</option>
                                        )
                                    })
                                }
                        </select>
                    </div>

                    <div className="form-group w-50">
                        <label>Style: </label>
                        {
                            this.state.style.map((style, index)=>{
                                return(
                                    <div key={index}>
                                        <input className="form-control"
                                            value={style}
                                            onChange={(e)=>this.handleStyeChange(e, index)}></input>
                                        <button type="button"
                                            className="btn btn-info"
                                            onClick={(e)=>this.handleStyleRemove(e, index)}>Remove</button>
                                    </div>
                                )
                            })
                        }
                        <button type="button"
                            className="btn btn-secondary"
                            onClick={(e)=>this.addStyle(e)}>Add Style</button>
                    </div>

                    <div className="form-group w-75">
                        <label>Tracklist: </label>
                        {
                            this.state.tracklist.map((track, index)=>{
                                return(
                                    <div key={index}>
                                        <input className="form-control"
                                            value={track}
                                            onChange={(e)=>this.handleTrackChange(e, index)}></input>
                                        <button type="button"
                                            className="btn btn-info"
                                            onClick={(e)=>this.handleTrackRemove(e, index)}>Remove</button>
                                    </div>
                                )
                            })
                        }
                        <button type="button"
                            className="btn btn-secondary"
                            onClick={(e)=>this.addTrack(e)}>Add Track</button>
                    </div>

                    <button type="submit" value="Add a new album" className="btn btn-primary">Save</button>
                </form>

            </div>
       
      );
    }
}
