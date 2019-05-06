import React, { Component } from 'react';
import { Button, Navbar, NavDropdown, Nav, Form} from 'react-bootstrap';

class NavbarIndex extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }
    logout() {
        sessionStorage.clear();    
        this.props.history.push("/home")
    }
    render(){
      return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
                    <Navbar.Brand href="/index">RentAll</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    <Button className="addOffer" variant="outline-light" size="sm" href="/addOffer" >Dodaj oferte</Button>
                    </Nav>
                    <Form inline>
                        <Navbar.Text className=" mr-sm-2">
                            Zalogowany jako : 
                        </Navbar.Text>
                        <Nav className="mr-auto">
                            <NavDropdown title={sessionStorage.getItem('login')} id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/alloff"><span className="glyphicon glyphicon-picture"></span> Oferty</NavDropdown.Item>
                                <NavDropdown.Item href="#" disabled><span className="glyphicon glyphicon-envelope"></span> Wiadomosci</NavDropdown.Item>
                                <NavDropdown.Item href="/settings" disabled><span className="glyphicon glyphicon-wrench"></span> Ustawienia</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item className="logout" onClick={this.logout} ><span className="glyphicon glyphicon-log-in"></span> Wyloguj</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Form>
                    </Navbar.Collapse>
                </Navbar>
      )
    }
  }

  export default NavbarIndex;