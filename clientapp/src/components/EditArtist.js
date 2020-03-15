import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert'
import axios from 'axios'
import { useState } from 'react';


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
            formClass : ""
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
                    id:res.data._id
                });
                this.props.history.push('/artists/edit/'+this.state.id);          
            })

        }
    }

    validate(e){
        this.setState({formClass: "was-validated"});
        const artist = {
            name: this.state.name,
            country: this.state.country,
            description: this.state.description
        }

        let emptyInputs=[];
        Object.keys(artist).map((key, i) => {
            if(artist[key] === ""){
                emptyInputs.push(key);
            }
            return null
        })

        if(emptyInputs.length > 0){
            console.log(emptyInputs)
        }
    }

    render(){
        console.log(this.state.id)
      return (
            <div>
                <AlertDismissibleExample />
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
                            className="btn btn-primary"
                            onClick={()=>{this.validate()}}>
                                Save
                        </button>
                </form>
            </div>
      );
    }
}


function AlertDismissibleExample() {
    const [show, setShow] = useState(true);
  
    if (show) {
      return (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>
            Change this and that and try again. Duis mollis, est non commodo
            luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
            Cras mattis consectetur purus sit amet fermentum.
          </p>
        </Alert>
      );
    }
    return <button onClick={() => setShow(true)}>Show Alert</button>;
}
