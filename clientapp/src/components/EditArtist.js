import React, { Component } from 'react';
import axios from 'axios'


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
            id: this.props.match.params.id
        }
    }

    componentDidMount(){
        if (this.state.id !== undefined){
            axios.get("http://localhost:9000/artists/"+this.state.id)
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
        const artist = {
            name: this.state.name,
            country: this.state.country,
            description: this.state.description
        }
        console.log(artist)
        if (this.state.id !== undefined){
            axios.patch("http://localhost:9000/artists/"+this.state.id, artist)
            .then(res => console.log(res.data));
        }
        else{
            axios.post("http://localhost:9000/artists", artist)
            .then(res => {
                console.log(res.data)
                this.setState({
                    toEdit: true,
                    id:res.data._id
                })           
            })

        }
    }

    render(){
        console.log(this.state.id)
        if (this.state.toEdit === true) {
            this.props.history.push('/artists/edit/'+this.state.id)
        }
      return (
            <div>
                <h2>Edit artist</h2>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangeName}>
                        </input>
                    </div>

                    <div className="form-group">
                        <label>Country: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.country}
                            onChange={this.onChangeCountry}>
                        </input>
                    </div>

                    <div className="form-group">
                        <label>Description: </label>
                        <textarea className="form-control"
                          rows="3"
                          value={this.state.description}
                          onChange={this.onChangeDesc}>
                          </textarea>
                    </div>

                    <button type="submit" value="Edit the artist" className="btn btn-primary">Save</button>
                </form>
            </div>
      );
    }
}