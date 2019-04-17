import React, { Component } from 'react';
import './alloff.css';
import { Button, Navbar, NavDropdown, Nav, Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

class alloff extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            login: "",
            offerts: []

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
                    offerts: parseJSON.value
                })
            })
    }

    logout() {
        sessionStorage.setItem("value", '');
        sessionStorage.clear();
        this.setState({ redirect: true });
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to={'/index'} />)
        }
        if (!sessionStorage.getItem("value")) {
            return (<Redirect to={'/index'} />)
        }
        return (
            <div className="box">
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="/index">RentAll</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <NavDropdown title="Menu" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/addOffer">Dodaj oferte</NavDropdown.Item>
                                <NavDropdown.Item href="/alloff">Oferty</NavDropdown.Item>
                                <NavDropdown.Item href="#">Ustawienia</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                    <Form inline>
                        <Navbar.Text className=" mr-sm-2">
                        Zalogowany jako : <b className="login"> {sessionStorage.getItem('login')} </b>
                        </Navbar.Text>
                        <Button className="logout" variant="outline-light" size="sm" onClick={this.logout}>Logout</Button>
                    </Form>
                </Navbar>
                <div className="clearfix"></div>
                <div className="ofbox">

                    {
                        this.state.offerts.map((item, i) => (
                            <div className="offcon" key={i}>
                                <div className="offoto"><img src={"https://localhost:44359/" + item.photos[0]} alt="as" /></div>
                                <div className="ofdesc">{item.title}
                                <div className="ofinf">
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
                                    <div className="ofprice">{item.price} zł</div>
                                    <div className="ofbutton"><button><a href={"/detailsoff/" + i}>Details</a></button></div>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            
                        ))

                    }

                </div>
            </div>
        );
    }
}
export default alloff;