import React, { Component } from 'react';
import './detailsoff.css';
import {Col,Row,Breadcrumb,Container, Button, Navbar, NavDropdown, Nav, Form, Carousel } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import NumberFormat from 'react-number-format';
class detailsoff extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      login: "",
      offerts: [],
      images: []

    }
    this.logout = this.logout.bind(this);
  }

  componentWillMount() {
    if (!sessionStorage.getItem("value")) {
      this.setState({ redirect: true });
    }

    fetch('https://localhost:44359/api/Offers/user/' + sessionStorage.getItem('login'))
      .then(response => response.json())
      .then(parseJSON => {
        this.setState({
          offerts: parseJSON.value,
          images: parseJSON.value[this.props.match.params.id].photos
        })
      })


  }

  logout() {
    sessionStorage.clear();
    this.props.history.push("/home")
  }

  showOffer() {
    if (this.state.offerts.length !== 0) {
      const obj = this.state.offerts[this.props.match.params.id];
      return (
        <Container>
          <Row className="headerOffer">
            <Col className="titleOffer" md={8}><b>{obj.title}</b></Col>
            <Col className="priceOffer" md={4}><NumberFormat value={obj.price} displayType={'text'} thousandSeparator={' '} /> zł</Col>
            <Col className="localisationOffer" md={4}><span className="glyphicon glyphicon-map-marker"></span>{obj.city}, {obj.street}</Col>
          </Row>
          <hr />
          <Row className="sliderUser">
            <Col sm={8}><Carousel>
              {
                this.state.images.map(function (item, i) {
                  return <Carousel.Item key={i}>
                    <img
                      className="d-block w-100"
                      src={"https://localhost:44359/" + item}
                      alt="First slide"
                    />
                  </Carousel.Item>

                })

              }
            </Carousel></Col>

            <Col sm={4}>
              <Col className="nameUser"><span className="glyphicon glyphicon-user"> </span> {obj.user.login}</Col>
              <Col className="phoneUser"><span className="glyphicon glyphicon-earphone"></span> {obj.user.phoneNumber}</Col>

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
            <Col className="detailsOffer">Kategoria : {obj.categoryName}</Col>
            <Col className="detailsOffer">Rodzaj ogłoszenia : {obj.offerTypeType}</Col>
            <Col className="detailsOffer">Powierzchnia : {obj.area}</Col>
            <Col className="detailsOffer">Piętro : {obj.level}</Col>
            <Col className="detailsOffer">Liczba pokoi : {obj.roomCount}</Col>
          </Row>
          <hr />
          <Row>
            <Col className="titleOffer">Opis ogłoszenia</Col>

          </Row>
          <hr />
          <Row className="descriptionOffer">
            <Col>{obj.description}</Col>
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
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
                    <Navbar.Brand href="/index">RentAll</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Button className="addOffer" variant="outline-light" size="sm" href="/addOffer" >Dodaj oferte</Button>
                    </Navbar.Collapse>
                    <Form inline>
                        <Navbar.Text className=" mr-sm-2">
                            Zalogowany jako : 
                        </Navbar.Text>
                        <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <NavDropdown title={sessionStorage.getItem('login')} id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/alloff"><span className="glyphicon glyphicon-picture"></span> Oferty</NavDropdown.Item>
                                <NavDropdown.Item href="#"><span className="glyphicon glyphicon-envelope"></span> Wiadomosci</NavDropdown.Item>
                                <NavDropdown.Item href="#"><span className="glyphicon glyphicon-wrench"></span> Ustawienia</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item className="logout" onClick={this.logout} ><span className="glyphicon glyphicon-log-in"></span> Wyloguj</NavDropdown.Item>
                                   
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                                    
                    </Form>
                </Navbar>
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