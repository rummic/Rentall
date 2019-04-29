import React, { Component } from 'react';
import { Button, Navbar, Form,ButtonGroup } from 'react-bootstrap';

class NavbarMainPage extends Component {
    render(){
      return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/index">RentAll</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">    
        </Navbar.Collapse>
        <Form inline>
        <ButtonGroup aria-label="Basic example">
        <Button variant="outline-warning" href="/login" size="sm" >Login</Button>
        <Button variant="outline-warning" href="/register" size="sm" >Register</Button>
        </ButtonGroup>
        </Form>
      </Navbar>
      )
    }
  }

  export default NavbarMainPage;
