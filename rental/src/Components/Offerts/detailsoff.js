import React, { Component } from 'react';
import '../Offerts/detailsoff.css';
import NavbarIndex from '../Navbar/indexNav';
import { Col, Row, Container, Form, Carousel, Breadcrumb } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import { Redirect } from 'react-router-dom';

class detailsoff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offerts: []
    }
  }

  componentWillMount() {
    fetch('https://localhost:44359/api/Offers/' + this.props.match.params.id)
      .then(response => response.json())
      .then(responseJSON => {
        if (responseJSON.hasErrors) {
          console.log(responseJSON.errors);
        } else {
          this.setState({
            offerts: responseJSON.value
          })
        }
      })
  }

  showOffer() {
    if (this.state.offerts.length !== 0) {
      const item = this.state.offerts;
      return (
        <Container>
          <Row className="headerOffer">
            <Col className="titleOffer" md={8}><b>{item.title}</b></Col>
            <Col className="priceOffer" md={4}><NumberFormat value={item.price} displayType={'text'} thousandSeparator={' '} /> zł</Col>
            <Col className="localisationOffer" md={4}><span className="glyphicon glyphicon-map-marker"></span>{item.city}, {item.street}</Col>
          </Row>
          <hr />
          <Row className="sliderUser">
            <Col sm={8}><Carousel>
              {
                item.photos.map(function (item, i) {
                  return <Carousel.Item key={i}>
                    <img
                      className="d-block w-100"
                      src={(item === undefined ? 'https://screenshotlayer.com/images/assets/placeholder.png' : "https://localhost:44359/" + item)}
                      alt="First slide"
                    />
                  </Carousel.Item>
                })
              }
            </Carousel></Col>
            <Col sm={4}>
              <Col className="nameUser"><span className="glyphicon glyphicon-user"> </span> {item.user.login}</Col>
              <Col className="phoneUser"><span className="glyphicon glyphicon-earphone"></span> {item.user.phoneNumber}</Col>
              <form>
                <Form.Group controlId="formBasicName">
                  <Form.Control type="text" required placeholder="Imie" name="firstName" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control type="email" required placeholder="Adres email" name="email" />
                </Form.Group>
                <Form.Group controlId="formBasicPhone">
                  <Form.Control type="text" required placeholder="Numer telefonu" name="phoneNumber" />
                </Form.Group>
                <textarea rows="10" cols="50"></textarea>
                <button type="submit">Wyslij</button>
              </form>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col className="detailsOffer">Kategoria : {item.categoryName}</Col>
            <Col className="detailsOffer">Rodzaj ogłoszenia : {item.offerTypeType}</Col>
            <Col className="detailsOffer">Powierzchnia : {item.area}</Col>
            <Col className="detailsOffer">Piętro : {item.level}</Col>
            <Col className="detailsOffer">Liczba pokoi : {item.roomCount}</Col>
          </Row>
          <hr />
          <Row>
            <Col className="titleOffer">Opis ogłoszenia</Col>
          </Row>
          <hr />
          <Row className="descriptionOffer">
            <Col>{item.description}</Col>
          </Row>
        </Container>
      )
    }
  }

  render() {
    if (!sessionStorage.getItem("token")) {
      return (<Redirect to={'/home'} />)
    }

    return (
      <div className="box">
        <NavbarIndex history={this.props.history} />
        <div className="clearfix"></div>
        <div className="offertbox">
          <Breadcrumb>
            <Breadcrumb.Item href="/index">RentAll</Breadcrumb.Item>
            <Breadcrumb.Item href="/alloff" >Oferty</Breadcrumb.Item>
            <Breadcrumb.Item active>Szczegóły</Breadcrumb.Item>
          </Breadcrumb>
          {
            this.showOffer()
          }
        </div>
      </div>
    );
  }
}
export default detailsoff;