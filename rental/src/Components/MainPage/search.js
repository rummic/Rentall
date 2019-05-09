import React, { Component } from 'react';
import '../Offerts/detailsoff.css';
import NavbarMainPage from '../Navbar/mainPageNav';
import { Col, Row, Container, Form, Carousel} from 'react-bootstrap';
import NumberFormat from 'react-number-format';
class search extends Component {

    detailsOffer() {
        const obj = this.props.location.state;
        return (
            <Container>
                <Row>
                    <Col md={1}>
                        <a href="/">Wróć</a>
                    </Col>
                </Row>
                <Row className="headerOffer">
                    <Col className="titleOffer" md={8}><b>{obj.title}</b></Col>
                    <Col className="priceOffer" md={4}><NumberFormat value={obj.price} displayType={'text'} thousandSeparator={' '} /> zł</Col>
                    <Col className="localisationOffer" md={4}><span className="glyphicon glyphicon-map-marker"></span>{obj.city}, {obj.street}</Col>
                </Row>
                <hr />
                <Row className="sliderUser">
                    <Col sm={8}><Carousel>
                        {
                            obj.photos.map(function (item, i) {
                                return <Carousel.Item key={i}>
                                    <img
                                        className="d-block w-100"
                                        src= {(item===undefined ? 'https://screenshotlayer.com/images/assets/placeholder.png' : "https://localhost:44359/" + item )}
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


    render() {
        return (
            <div className="box">
                <NavbarMainPage />
                <div className="clearfix"></div>
                <div className="offertbox">
                    <div>
                        {
                            this.detailsOffer()
                        }
                    </div>

                </div>
            </div>
        );
    }
}
export default search;