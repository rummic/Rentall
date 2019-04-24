import React, { Component } from 'react';
import '../MainPage/home.css';
import logo from '../../fotos/back.jpg'
import { Redirect } from 'react-router-dom';
import { Button,Navbar, NavDropdown, Nav,Form } from 'react-bootstrap';

class homez extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login: "",
        }
        this.logout = this.logout.bind(this);
    }


    logout() {
        sessionStorage.clear();
        this.props.history.push("/home")
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