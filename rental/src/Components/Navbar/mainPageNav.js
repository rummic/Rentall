import React, { Component } from 'react';
import { Button, Navbar,Nav, Form, ButtonGroup } from 'react-bootstrap';

class NavbarMainPage extends Component {
  render() {
    return (
      <Navbar expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/index">RentAll</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          </Nav>
          <Form inline>
          <ButtonGroup aria-label="Basic example">
            <Button variant="outline-warning" href="/login" size="sm" >Login</Button>
            <Button variant="outline-warning" href="/register" size="sm" >Register</Button>
          </ButtonGroup>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default NavbarMainPage;
