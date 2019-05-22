import React, { Component } from 'react';
import '../Offerts/detailsoff.css';
import NavbarIndex from '../Navbar/indexNav';
import { Col, Row, Container, Carousel } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import NavbarMainPage from '../Navbar/mainPageNav';

class search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
        }
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    sendMessage() {
        const token = sessionStorage.getItem("token");
        fetch('https://localhost:44359/api/Messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `bearer ${token}`
            },
            body: JSON.stringify({
                "recipientLogin": this.props.location.state.user.login,
                "messageText": this.state.message
            })
        }).then(response => response.json())
            .then(parseJSON => {
                if (!parseJSON.hasErrors) {
                    alert("wysłano wiadomość")
                    window.location.reload();
                }
            })
    }

    render() {
        const obj = this.props.location.state;
        return (
            <div className="box">
              {sessionStorage.getItem("token")  ? <NavbarIndex history={this.props.history} />: <NavbarMainPage />}
                <div className="clearfix"></div>
                <div className="offertbox">
                    <div>
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
                                                    src={(item === undefined ? 'https://screenshotlayer.com/images/assets/placeholder.png' : "https://localhost:44359/" + item)}
                                                    alt="First slide"
                                                />
                                            </Carousel.Item>
                                        })
                                    }
                                </Carousel></Col>
                                <Col sm={4}>
                                    <Col className="nameUser"><span className="glyphicon glyphicon-user"> </span> {obj.user.login}</Col>
                                    <Col className="phoneUser"><span className="glyphicon glyphicon-earphone"></span> {obj.user.phoneNumber}</Col>
                                    
                                    <textarea name="message" type="text" rows="10" cols="50" onChange={this.onChange} maxLength="200" ></textarea>
                                    <button  onClick={() => this.sendMessage()}>Wyslij</button>
                                    
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
                    </div>

                </div>
            </div>
        );
    }
}
export default search;