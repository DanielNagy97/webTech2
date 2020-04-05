import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert'

export default class AlertMessage extends Component {
    constructor(props){
        super(props);

            this.state = {
                show: true
            }
        }

    setShow(bool){
        this.setState({show:bool})
    }

    render(){
        if (this.state.show) {
            return (
              <Alert id="alertMSG" variant={this.props.variant} onClose={() => this.setShow(false)} dismissible>
                <Alert.Heading>{this.props.message.head}</Alert.Heading>
                <p>
                  {this.props.message.body}
                </p>
              </Alert>
            );
          }
          return null
    }
}
