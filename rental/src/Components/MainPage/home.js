import React, { Component } from 'react';
import './home.css';
import { Button, Row, Container, Col, Collapse } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import NavbarMainPage from '../Navbar/mainPageNav';
import { Redirect, Link } from 'react-router-dom';
import SearchOffer from '../MainPage/searchOffer';

class home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            offerts: [],
            category: [],
            offerType: [],
            categoryId: "",
            offerTypeId: "",
            title: "",
            priceMin: "",
            priceMax: "",
            areaMin: "",
            areaMax: "",
            level: 0,
            roomCount: "",
            city: "",
            limit: 2,
            open: false,
            featuredOffers: [],
            page: 1
        }
        this.onChange = this.onChange.bind(this);
        this.searchOffer = this.searchOffer.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    componentDidMount() {
        fetch('https://localhost:44359/api/Categories')
            .then(response => response.json())
            .then(parseJSON => {
                this.setState({
                    category: parseJSON.value
                })
            })

        fetch('https://localhost:44359/api/OfferTypes')
            .then(response => response.json())
            .then(parseJSON => {
                this.setState({
                    offerType: parseJSON.value
                })
            })

        fetch('https://localhost:44359/api/Offers/Main/3')
            .then(response => response.json())
            .then(parseJSON => {
                this.setState({
                    featuredOffers: parseJSON.value
                })
            })
            window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    };

    handleScroll() {
        const wScroll = window.scrollY
        const w = window.screen.height / 2
        if (wScroll > w) {
            this.setState({
                limit: this.state.limit + 1
            })
        }
    };

    searchOffer() {
        document.getElementById("emptyOffer").style.display = 'none ';
        var param = ""
        if (this.state.city) {
            param += `city=${this.state.city}&`
        }
        if (this.state.title) {
            param += `title=${this.state.title}&`
        }
        if (this.state.priceMin) {
            param += `priceMin=${this.state.priceMin}&`
        }
        if (this.state.priceMax) {
            param += `priceMax=${this.state.priceMax}&`
        }
        if (this.state.areaMax) {
            param += `areaMax=${this.state.areaMax}&`
        }
        if (this.state.areaMin) {
            param += `areaMin=${this.state.areaMin}&`
        }
        if (this.state.level) {
            param += `level=${this.state.level}&`
        }
        if (this.state.roomCount) {
            param += `roomCount=${this.state.roomCount}&`
        }
        if (this.state.categoryId) {
            param += `categoryId=${this.state.categoryId}&`
        }
        if (this.state.offerTypeId) {
            param += `offerTypeId=${this.state.offerTypeId}&`
        }
        if (this.state.limit) {
            param += `limit=${this.state.limit}&`
        }
        if (this.state.page) {
            param += `page=${this.state.page}`
        }

        fetch('https://localhost:44359/api/Offers/Advanced?' + param)
            .then(response => response.json())
            .then(parseJSON => {
                if (parseJSON.hasErrors) {
                    document.getElementById("emptyOffer").innerHTML = parseJSON.errors;
                    document.getElementById("emptyOffer").style.display = 'block';
                    this.setState({
                        offerts: []
                    })
                } else {
                    this.setState({
                        offerts: parseJSON.value || []
                    })
                    document.getElementsByClassName("offerts")[0].style.display = 'none';
                }
            })
    }

    render() {
        if (sessionStorage.getItem("token")) {
            return (<Redirect to={'/index'} />)
        }
        const { open } = this.state;
        return (
            <div className="box">
                <NavbarMainPage />
                <div className="clearfix"></div>
                <div className="contentbox">
                    <div className="description">U nas możesz wynająć nawet budę</div>
                    <div className="subdescription">wyszukaj interesujących cię ofert</div>
                    <div className="searchbox arrow">
                        <input type="text" placeholder="Tytuł" name="title" onChange={this.onChange} />
                        <button value="wyszukaj" onClick={this.searchOffer} >Wyszukaj</button>
                        <Button
                            onClick={() => this.setState({ open: !open })}
                            aria-controls="example-collapse-text"
                            aria-expanded={open}
                        >
                            Zaawansowane
                        </Button>
                        <Collapse in={this.state.open}>
                            <div id="example-collapse-text">
                                <Container>
                                    <Row>
                                        <Col sm={12}><input type="text" placeholder="Miasto" name="city" onChange={this.onChange} /></Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <label>Kategoria: </label>
                                            <select className="arrow" defaultValue={'DEFAULT'} name="categoryId" onChange={this.onChange} >
                                                {
                                                    <option disabled value="DEFAULT">Wybierz..</option>
                                                }
                                                {
                                                    this.state.category.map(item => (
                                                        <option key={item.name} value={item.id}>{item.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </Col>
                                        <Col>
                                            <label>Typ: </label>
                                            <select name="offerTypeId" defaultValue={'DEFAULT'} onChange={this.onChange} >
                                                {
                                                    <option disabled value="DEFAULT" >Wybierz..</option>
                                                }
                                                {
                                                    this.state.offerType.map(item => (
                                                        <option key={item.type} value={item.id}>{item.type}</option>
                                                    ))
                                                }
                                            </select>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col> <input type="text" placeholder="Minimalna cena" name="priceMin" onChange={this.onChange} /></Col>
                                        <Col> <input type="text" placeholder="Maxymalna cena" name="priceMax" onChange={this.onChange} /></Col>
                                    </Row>
                                    <Row>
                                        <Col><input type="text" placeholder="Minimalna powierzchnia" name="areaMin" onChange={this.onChange} /></Col>
                                        <Col><input type="text" placeholder="Maxymalna powierzchnia" name="areaMax" onChange={this.onChange} /></Col>
                                    </Row>
                                    <Row>
                                        <Col><input type="text" placeholder="Piętro" name="level" onChange={this.onChange} /></Col>
                                        <Col> <input type="text" placeholder="Ilość pomieszczeń" name="roomCount" onChange={this.onChange} /></Col>
                                    </Row>
                                </Container>
                            </div>
                        </Collapse>
                    </div>
                </div>
                <div className="emptyOffer" id="emptyOffer"></div>
                {
                    this.state.offerts.map((item, i) => (
                        <SearchOffer offers={item} key={i} />
                    ))
                }
                <button onClick={this.searchOffer} >Zobacz wiecej</button>
                <div className="offerts">
                    <p className="random">Przykładowe nasze oferty</p>
                    {
                        this.state.featuredOffers.map((item) => (
                            <div className="offert" key={item.id}>
                                <div className="ofer"><img src={(item.photos[0] === undefined
                                    ? 'https://screenshotlayer.com/images/assets/placeholder.png' : "https://localhost:44359/" + item.photos[0])}
                                    alt="as" />
                                    <Row>
                                        <Col >Kategoria : {item.categoryName}</Col>
                                        <Col >Rodzaj ogłoszenia : {item.offerTypeType}</Col>
                                        <Col >Powierzchnia : <NumberFormat value={item.area} displayType={'text'} thousandSeparator={' '} suffix={'m²'} /></Col>
                                    </Row>
                                    <div className="cost">
                                        <NumberFormat value={item.price} displayType={'text'} thousandSeparator={' '} suffix={'zł'} />
                                    </div>
                                </div>
                                <div className="ofbutton"><Link to={{ pathname: '/search', state: item }}><Button>Szczegóły</Button></Link></div>
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
}
export default home;