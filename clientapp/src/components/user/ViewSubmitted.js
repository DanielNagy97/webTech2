import React, { Component } from 'react';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import ListAlbums from '../albums/ListAlbums';
import ListArtists from '../artists/ListArtists';
import ListCopies from '../copies/ListCopies'


export default class ViewSubmitted extends Component {

    render(){
        return (
            <Accordion defaultActiveKey="0">

                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            Collection
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <ListCopies url={"owner/"+this.props.id} />
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>

                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                            Albums Submitted By User
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>
                            <ListAlbums url={"postedBy/"+this.props.id} />
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>

                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="2">
                            Artists Submitted By User
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="2">
                        <Card.Body>
                            <ListArtists url={"postedBy/"+this.props.id} />
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>

            </Accordion>
        )
    }
}
