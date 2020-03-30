import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel'


export default class Header extends Component {
    render(){
      console.log(this.props.data)
        return (
            <Carousel>
              {
              this.props.data.map((item, key)=>{
                return(
                  <Carousel.Item key={key}>
                  <img
                    className="d-block w-100"
                    src={item.im}
                    alt={item.alt}
                  />
                  <Carousel.Caption>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </Carousel.Caption>
                </Carousel.Item>
                )
              })
              }
            </Carousel>
      );
    }
}