import React, { Component } from 'react';
import NavbarIndex from '../Navbar/indexNav';
import { Col, Row, Container, Carousel, Breadcrumb } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';

const token = sessionStorage.getItem("token");

const areaEr = RegExp(/^[0-9]*$/);
const levelEr = RegExp(/^[0-9]*$/);
const zipCodeEr = RegExp(/^[0-9]{2}(?:-[0-9]{3})?$/)
const roomCountEr = RegExp(/^[0-9]*$/);
const priceEr = RegExp(/^(\d*([,](?=\d{0,3}))?\d+)+((?!\2)[,]\d\d)?$/)

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
            zipCode: "",
            formErrors: {
                titleEr: "",
                descriptionEr: "",
                numberEr: "",
                zipCodeEr: "",
                levelEr: "",
                areaEr: "",
                roomCountEr: "",
                cityEr: "",
                streetEr: "",
                cityStreetEr: "",
                priceEr: ""
            }
        }
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })

        const { name, value } = e.target;
        let formErrors = this.state.formErrors;

        switch (name) {
            case 'title':
                formErrors.titleEr = value.length < 3 && value.length > 0 ? 'Wymagane minimum 3 znaki' : value.length > 50 ? "Tytuł nie może zawierać więcej niż 50 znaków." : "";
                break;
            case 'description':
                formErrors.descriptionEr = value.length < 3 && value.length > 0 ? 'Wymagane minimum 3 znaki' : value.length > 1200 ? "Opis nie może zawierać więcej niż 1200 znaków." : "";
                break;
            case 'zipCode':
                formErrors.zipCodeEr = zipCodeEr.test(value) ? "" : "Błędny kod pocztowy. Format kodu __-___";
                break;
            case 'level':
                formErrors.levelEr = levelEr.test(value) ? "" : "Pole może zawierać tylko cyfry."
                break;
            case 'area':
                formErrors.areaEr = areaEr.test(value) ? "" : "Pole może zawierać tylko cyfry."
                break;
            case 'roomCount':
                formErrors.roomCountEr = roomCountEr.test(value) ? "" : "Pole może zawierać tylko cyfry."
                break;
            case 'city':
                formErrors.cityEr = value.length < 3 && value.length > 0 ? "Pole musi zawierać conajmniej 3 znaki." : ""
                break;
            case 'street':
                formErrors.streetEr = value.length < 3 && value.length > 0 ? "Pole musi zawierać conajmniej 3 znaki." : ""
                break;
            case 'price':
                formErrors.priceEr = priceEr.test(value) ? "" : "Błąd."
                break;
            default:
                break;
        }
        this.setState({ formErrors, [name]: value })
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
                                if (parseJSON.hasErrors) {
                                    document.getElementById("badForm").innerHTML = parseJSON.errors;
                                    document.getElementById("badForm").style.color = "red";
                                } else {
                                    swal("Dobra robota!", "Poprawnie zmieniono ogłoszenie!", "success");
                                    this.props.history.push("/alloff")
                                }
                            })
                    }
                }
            }
        }
    }

    render() {
            const stylebut = {
                    width:"40%",
                    marginBottom:"10px",
                    border: "none",
                        backgroundColor: "orange",
                    marginTop:"30px",
                        height: "40px",
                        borderRadius: "7px",
                        color:" white",
                        cursor:"pointer"

                    
                
            }



        const { formErrors } = this.state;
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
                            <Col className="titleOffer" md={8}><label>Tytuł : </label><input type="text" value={obj.title} name="title" onChange={this.onChange} />
                                {formErrors.titleEr.length > 0 && (<span className="errorMessage">{formErrors.titleEr}</span>)}
                            </Col>
                            <Col className="priceOffer" md={4}><label>Cena: </label><input type="number" value={obj.price} name="price" onChange={this.onChange} />
                                {formErrors.priceEr.length > 0 && (<span className="errorMessage">{formErrors.priceEr}</span>)}
                            </Col>
                            <Col className="localisationOffer" md={12}><span className="glyphicon glyphicon-map-marker"></span><label>Miasto oraz ulica : </label><input type="text" value={obj.city} name="city" onChange={this.onChange} />,<label></label><input type="text" value={obj.street} name="street" onChange={this.onChange} />
                                {formErrors.cityEr.length > 0 && (<span className="errorMessage">{formErrors.cityEr}</span>)}
                                {formErrors.streetEr.length > 0 && (<span className="errorMessage">{formErrors.streetEr}</span>)}
                            </Col>
                        </Row>
                        <hr />
                        <Row className="sliderUser">
                            <Col sm={8}><Carousel>
                                {
                                    obj.photos.length === 0 ? <img src='https://screenshotlayer.com/images/assets/placeholder.png' alt="foto" /> : ""
                                }
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
                            <Col className="detailsOffer"><label style={{marginRight: "10px"}}>Kategoria :</label>
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
                            <Col className="detailsOffer">Powierzchnia : <input type="number" value={obj.area} name="area" onChange={this.onChange} />
                                {formErrors.areaEr.length > 0 && (<span className="errorMessage">{formErrors.areaEr}</span>)}
                            </Col>
                            <Col className="detailsOffer">Piętro : <input type="number" value={obj.level} name="level" onChange={this.onChange} />
                                {formErrors.levelEr.length > 0 && (<span className="errorMessage">{formErrors.levelEr}</span>)}
                            </Col>
                            <Col className="detailsOffer">Liczba pokoi : <input type="number" value={obj.roomCount} name="roomCount" onChange={this.onChange} />
                                {formErrors.roomCountEr.length > 0 && (<span className="errorMessage">{formErrors.roomCountEr}</span>)}
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col className="titleOffer">Opis ogłoszenia</Col>
                        </Row>
                        <hr />
                        <Row className="descriptionOffer">
                            <Col><textarea rows="8" type="text" value={obj.description} name="description" onChange={this.onChange} ></textarea>
                                {formErrors.descriptionEr.length > 0 && (<span className="errorMessage">{formErrors.descriptionEr}</span>)}
                            </Col>
                        </Row>
                        <button style={stylebut} variant="primary" onClick={() => this.update(obj.id)}>Aktualizuj</button>
                    </Container>
                </div>
            </div>
        );
    }
}
export default updateOffer;