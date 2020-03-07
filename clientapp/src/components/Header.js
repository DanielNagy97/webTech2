import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel'


export default class Header extends Component {
    render(){
        return (
            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={require('../images/vinyl.jpg')}
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>First slide</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={require('../images/vinyl2.jpg')}
                  alt="Third slide"
                />

                <Carousel.Caption>
                  <h3>Second slide</h3>
                  <p>Nam accumsan fermentum massa, id cursus erat iaculis sed.</p>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={require('../images/vinyl3.jpg')}
                  alt="Third slide"
                />
                <Carousel.Caption>
                  <h3>Third slide</h3>
                  <p>Mauris aliquam eros in pellentesque congue.</p>
                </Carousel.Caption>
              </Carousel.Item>

            </Carousel>
      );
    }
}