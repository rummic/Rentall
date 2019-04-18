import React, { Component } from 'react';
import './home.css';
import logo from '../fotos/back.jpg'
import { Redirect } from 'react-router-dom';
import { Button,Navbar, NavDropdown, Nav,Form } from 'react-bootstrap';

class homez extends Component {

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

        if (sessionStorage.getItem('login') != null) {
            fetch('https://localhost:44359/api/Offers/user/' + sessionStorage.getItem('login'))
                .then(response => response.json())
                .then(parseJSON => {
                    this.setState({
                        offerts: parseJSON.value
                    })
                })

        }
    }

    logout() {
        sessionStorage.setItem("value", '');
        sessionStorage.clear();
        this.setState({ redirect: true });
    }



    render() {


        if (this.state.redirect) {
            return (<Redirect to={'/home'} />)
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


                <div className="contentbox">
                    <div className="description">U nas możesz wynająć nawet budę</div>
                    <div className="subdescription">wyszukaj interesujących cię ofert</div>
                    <div className="searchbox arrow">
                        <select>
                            <option value="mieszkanie">Mieszkanie</option>
                            <option value="dom">Dom</option>
                        </select>
                        <select>
                            <option value="kupno">Kupno</option>
                            <option value="wynajem">Wynajem</option>
                        </select>
                        <input type="text" placeholder="Miejscowość" />
                        <button value="wyszukaj">Wyszukaj</button>
                    </div>
                </div>
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
            </div >

        );
    }
}
export default homez;