import React, { Component } from 'react';
import './accsettings.css';
import { Button, Navbar, NavDropdown, Nav, Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

class accsettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: null,
      password: null,
      firstName: null,
      lastName: null,
      email: null,
      phoneNumber: "",
      role: "User",
      user: []
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  componentWillMount() {
    const token = sessionStorage.getItem("token");
    fetch('https://localhost:44359/api/Users',{
      method:'GET',
      headers: { 'Content-Type': 'application/json',
      "Authorization": `bearer ${token}`
     },
    }).then(response => response.json())
      .then(parseJSON => {
        this.setState({
          user: parseJSON.value 
        })
      })
  }

  update() {
    /* fetch('https://localhost:44359/api/Users', {
       method: 'PUT',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({
         "login": this.state.login,
         "password": this.state.password,
         "firstName": this.state.firstName,
         "lastName": this.state.lastName,
         "email": this.state.email,
         "phoneNumber": this.state.phoneNumber,
         "role": this.state.role
       })
     })
     .then(response => response.json())
       .then(parseJSON => {
         console.log(parseJSON);
       })
     */
  }

  render() {
    if (!sessionStorage.getItem("token")) {
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
                <NavDropdown.Item href="/settings">Ustawienia</NavDropdown.Item>
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
        <div className="contentbox1">
          <Form>
            <div className="offerts1">
              <div className="title">Ustawienia </div>
              <div className="section1">
                <label>Imie</label>
                <input type="text" value={this.state.user[0].firstName} placeholder="Podaj imie" name="firstName" onChange={this.onChange} />
              </div>
              <div className="clearfix"></div>
              <div className="section1">
                <label>Nazwisko</label>
                <input type="text" placeholder="Podaj nazwisko" value={this.state.user[0].lastName} name="lastName" onChange={this.onChange} />
              </div>
              <div className="section1">
                <label>Email</label>
                <input type="text" placeholder="Podaj email" name="email" value={this.state.user[0].email} onChange={this.onChange} />
              </div>
              <div className="section1">
                <label>Numer telefonu</label>
                <input type="text" placeholder="Podaj numer telefonu" name="phoneNumber" value={this.state.user[0].phoneNumber} onChange={this.onChange} />
              </div>
              <div className="section1">
                <label>Hasło</label>
                <input type="text" placeholder="Podaj hasło" name="password" onChange={this.onChange} />
              </div>
              <div className="clearfix"></div>
            </div>
            <div className="but"><button variant="primary" onClick={this.update.bind(this)}>Zmień dane</button></div>
          </Form>
        </div>
      </div>
    );
  }
}

export default accsettings;