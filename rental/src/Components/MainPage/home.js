import React, { Component } from 'react';
import './home.css';
import logo from '../../fotos/back.jpg'
import { Button, Row, Container, Col,Collapse } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import NavbarMainPage from '../Navbar/mainPageNav';
import { Redirect, Link } from 'react-router-dom';

class home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            offerts: [],
            category: [],
            offerType: [],
            categoryName: "",
            offerTypeName: "",
            title: "",
            priceMin: "",
            priceMax: "",
            areaMin: "",
            areaMax: "",
            level: "",
            roomCount: "",
            city: "",
            limit : 10,
            open: false,
        }
        this.onChange = this.onChange.bind(this);
        this.searchOffer = this.searchOffer.bind(this);
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
    }

    showOfferts() {
        if (this.state.offerts.length > 0) {
            return (
                this.state.offerts.map((item, i) => (
                    <div className="offerts1 searchFoto" key={i}>
                        <div className="offcon" >
                            <div className="offoto"><img src={"https://localhost:44359/" + item.photos[0]} alt="foto" /></div>
                            <div className="ofdesc">{item.title}<hr />
                                <div className="ofinf">
                                    <div className="localization"> {item.city}, {item.street}</div>
                                    <ul>
                                        <li>Powierzchnia : {item.area} m²</li>
                                        <li>Piętro : {item.level}</li>
                                        <li>Liczba pokoi : {item.roomCount}</li>
                                        <li>Kategoria : {item.categoryName}</li>
                                        <li>Rodzaj ogłoszenia : {item.offerTypeType}</li>
                                    </ul>

                                </div>
                            </div>
                            <div className="ofdes">
                                <div className="ofprice"><NumberFormat value={item.price} displayType={'text'} thousandSeparator={' '} suffix={' zł'} /> </div>
                                <div className="ofbutton"><Link to={{ pathname: '/search', state: item }}><Button>Szczegóły</Button></Link></div>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                ))
            )
        }
    }

    searchOffer() {
        document.getElementById("emptyOffer").style.display = 'none ';
        fetch('https://localhost:44359/api/Offers/Advanced?' +
            `city=${this.state.city}&title=${this.state.title}&priceMin=${this.state.priceMin}
                &priceMax=${this.state.priceMax}&areaMin=${this.state.areaMin}&areaMax=${this.state.areaMax}&
                level=${this.state.level}&roomCount=${this.state.roomCount}
                &categoryName=${this.state.categoryName}&offerType=${this.state.offerTypeName}&limit=${this.state.limit}`)
            .then(response => response.json())
            .then(parseJSON => {
                if (parseJSON.value != null) {
                    this.setState({
                        offerts: parseJSON.value || []
                    })
                    document.getElementsByClassName("offerts")[0].style.display = 'none';
                } else {
                    document.getElementById("emptyOffer").innerHTML = "Brak ofert";
                    document.getElementById("emptyOffer").style.display = 'block';
                    this.setState({
                        offerts: []
                    })
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
                        <button
                            onClick={() => this.setState({ open: !open })}
                            aria-controls="example-collapse-text"
                            aria-expanded={open}
                            
                        >
                            Zaawansowane
                        </button>
                        <Collapse in={this.state.open}>
                            <div id="example-collapse-text">
                                <Container>
                                    <Row>
                                        <Col sm={12}><input type="text" placeholder="Miasto" name="city" onChange={this.onChange} /></Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                        <label>Kategoria: </label>
                                            <select className="arrow" defaultValue={'DEFAULT'} name="categoryName" onChange={this.onChange} >
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
                                            <select name="offerTypeName" defaultValue={'DEFAULT'} onChange={this.onChange} >
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
                    this.showOfferts()
                }
                <div className="offerts">
                    <p className="random">Przykładowe nasze oferty</p>
                    <div className="offert">
                        <div className="ofer"><img src={logo} alt="as" />jakiś tam opisik<div className="cost">144zł</div></div>
                        <button>Szczegóły</button>
                    </div>
                    <div className="offert">
                        <div className="ofer"><img src={logo} alt="as" />jakiś tam opisik<div className="cost">144zł</div></div>
                        <button>Szczegóły</button>
                    </div>
                    <div className="offert">
                        <div className="ofer"><img src={logo} alt="as" />jakiś tam opisik<div className="cost">144zł</div></div>
                        <button>Szczegóły</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default home;