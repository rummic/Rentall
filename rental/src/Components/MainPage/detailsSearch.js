import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../Offerts/detailsoff.css';
import NavbarIndex from '../Navbar/indexNav';
import { Col, Row, Container, Carousel } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import NavbarMainPage from '../Navbar/mainPageNav';
import swal from 'sweetalert';

class search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            offerts: []
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
                "recipientLogin": this.state.offerts.user.login,
                "messageText": this.state.message
            })
        }).then(response => response.json())
            .then(parseJSON => {
                if (!parseJSON.hasErrors) {
                    swal({
                        title: "Dobra robota!", text: "Poprawnie wysłano wiadomość!", type:
                            "success", icon: "success"
                    }).then(function () {
                        window.location.reload();
                    }
                    );
                }
            })
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
                    <Row>
                        <Col md={1}>
                            <Link to={{ pathname: '/' }}>Wróć</Link>
                        </Col>
                    </Row>
                    <Row className="headerOffer">
                        <Col className="titleOffer" md={8}><b>{item.title}</b></Col>
                        <Col className="priceOffer" md={4}><NumberFormat value={item.price} displayType={'text'} thousandSeparator={' '} /> zł</Col>
                        <Col className="localisationOffer" md={4}><span className="glyphicon glyphicon-map-marker"></span>{item.city}, {item.street}</Col>
                    </Row>
                    <hr />
                    <Row className="sliderUser">
                        <Col sm={8}><Carousel>
                            {
                                this.state.offerts.photos.length === 0 ? <img src='https://screenshotlayer.com/images/assets/placeholder.png' alt="foto" /> : ""
                            }
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
                            {sessionStorage.getItem("token") && sessionStorage.getItem("login") !== item.user.login ? <div>
                                <textarea name="message" type="text" rows="10" cols="50" onChange={this.onChange} maxLength="200" ></textarea>
                                <button onClick={() => this.sendMessage()}>Wyslij</button>
                            </div> : ""}
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
        return (
            <div className="box">
                {sessionStorage.getItem("token") ? <NavbarIndex history={this.props.history} /> : <NavbarMainPage />}
                <div className="clearfix"></div>
                <div className="offertbox">
                    <div>
                        {
                            this.showOffer()
                        }
                    </div>
                </div>
            </div>
        );
    }
}
export default search;