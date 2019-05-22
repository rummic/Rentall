import React, { Component } from 'react';
import NavbarIndex from '../Navbar/indexNav';
import { Col, Row, Container, Carousel, Breadcrumb } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

const token = sessionStorage.getItem("token");

class updateOffer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            title: "",
            description: "",
            categoryName: "",
            offerTypeType: "",
            price: "",
            area: 0,
            level: 0,
            roomCount: 0,
            city: "",
            street: "",
            photos: [],
            user: [],
            category: [],
            offerType: [],
            zipCode: ""
        }
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    componentWillMount() {
        const obj = this.props.location.state;
        this.setState({
            id: obj.id,
            title: obj.title,
            description: obj.description,
            price: obj.price,
            area: obj.area,
            level: obj.level,
            roomCount: obj.roomCount,
            city: obj.city,
            street: obj.street,
            photos: obj.photos,
            user: obj.user,
            categoryName: obj.categoryName,
            offerTypeType: obj.offerTypeType,
            zipCode: obj.zipCode
        })


        fetch('https://localhost:44359/api/OfferTypes')
            .then(response => response.json())
            .then(responseJSON => {
                this.setState({
                    offerType: responseJSON.value
                })
            })

        fetch('https://localhost:44359/api/Categories')
            .then(response => response.json())
            .then(responseJSON => {
                this.setState({
                    category: responseJSON.value
                })
            })
    }

    update(id) {
        for (let i = 0; this.state.category.length > i; i++) {
            if (this.state.categoryName === this.state.category[i].name) {
                for (let j = 0; this.state.offerType.length > j; j++) {
                    if (this.state.offerTypeType === this.state.offerType[j].type) {
                        fetch('https://localhost:44359/api/Offers', {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                                "Authorization": `bearer ${token}`
                            },
                            body: JSON.stringify({
                                "id": id,
                                "title": this.state.title,
                                "description": this.state.description,
                                "price": this.state.price,
                                "area": this.state.area,
                                "level": this.state.level,
                                "roomCount": this.state.roomCount,
                                "city": this.state.city,
                                "street": this.state.street,
                                "categoryId": (i + 1),
                                "offerTypeId": (j + 1),
                                "zipCode": this.state.zipCode
                            })
                        })
                            .then(response => response.json())
                            .then(parseJSON => {
                                console.log(parseJSON)
                                if (parseJSON.hasErrors) {
                                    document.getElementById("badForm").innerHTML = parseJSON.errors;
                                    document.getElementById("badForm").style.color = "red";
                                } else {
                                    alert("Poprawnie zmieniono dane")
                                    this.props.history.push("/alloff")
                                }
                            })
                    }
                }
            }
        }
    }

    render() {
        if (!sessionStorage.getItem("token")) {
            return (<Redirect to={'/home'} />)
        }
        const obj = this.state;
        return (
            <div className="box">
                <NavbarIndex history={this.props.history} />
                <div className="clearfix"></div>
                <div className="offertbox">
                    <Breadcrumb>
                        <Breadcrumb.Item href="/index">RentAll</Breadcrumb.Item>
                        <Breadcrumb.Item href="/alloff" >Oferty</Breadcrumb.Item>
                        <Breadcrumb.Item active>Aktualizacja</Breadcrumb.Item>
                    </Breadcrumb>
                    <Container>
                    <p id="badForm"></p>
                        <Row className="headerOffer">
                            <Col className="titleOffer" md={8}><input type="text" value={obj.title} name="title" onChange={this.onChange} /></Col>
                            <Col className="priceOffer" md={4}><input type="number" value={obj.price} name="price" onChange={this.onChange} /></Col>
                            <Col className="localisationOffer" md={4}><span className="glyphicon glyphicon-map-marker"></span><input type="text" value={obj.city} name="city" onChange={this.onChange} />,<input type="text" value={obj.street} name="street" onChange={this.onChange} /></Col>
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
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col className="detailsOffer">Kategoria :
                                 <select className="arrow" value={obj.categoryName} name="categoryName" onChange={this.onChange} >
                                    {
                                        this.state.category.map(item => (
                                            <option key={item.id} value={item.name}>{item.name}</option>
                                        ))
                                    }
                                </select>
                            </Col>
                            <Col className="detailsOffer">Rodzaj ogłoszenia :
                            <select className="arrow" value={obj.offerTypeType} name="offerTypeType" onChange={this.onChange} >
                                    {
                                        this.state.offerType.map(item => (
                                            <option key={item.id} value={item.type}>{item.type}</option>
                                        ))
                                    }
                                </select>
                            </Col>
                            <Col className="detailsOffer">Powierzchnia : <input type="text" value={obj.area} name="area" onChange={this.onChange} /></Col>
                            <Col className="detailsOffer">Piętro : <input type="text" value={obj.level} name="level" onChange={this.onChange} /></Col>
                            <Col className="detailsOffer">Liczba pokoi : <input type="text" value={obj.roomCount} name="roomCount" onChange={this.onChange} /></Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col className="titleOffer">Opis ogłoszenia</Col>
                        </Row>
                        <hr />
                        <Row className="descriptionOffer">
                            <Col><input type="text" value={obj.description} name="description" onChange={this.onChange} /></Col>
                        </Row>
                        <button variant="primary" onClick={() => this.update(obj.id)}>Aktualizuj</button>
                    </Container>
                </div>
            </div>
        );
    }
}
export default updateOffer;