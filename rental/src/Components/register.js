import React, { Component } from 'react';
import './register.css';
import { Form, Button, Row, Col } from 'react-bootstrap';
import {Link} from 'react-router-dom';



class register extends Component {

  state = {
    user: [],
    newUserData: {
      login: '',
      password: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
    }

  }

  addUser() {
    fetch('https://localhost:44359/api/Users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "login": this.state.newUserData.login,
        "password": this.state.newUserData.password,
        "firstName": this.state.newUserData.firstName,
        "lastName": this.state.newUserData.lastName,
        "email": this.state.newUserData.email,
        "phoneNumber": this.state.newUserData.phoneNumber,
      })
    });


  }

  render() {
    return (
      <div className="fomrconatiner">
        <div className="formbox">
          <div className="formtext">
            <Row>
              <Col md={1}>
                <Link to="/"><h1>&lsaquo;</h1></Link>
              </Col>
              <Col md={10}>
                <p>RentAll &ensp; Rejestracja</p>
              </Col>
            </Row>

            <p className="log">Zarejestruj się</p>

          </div>
          <Form>
            <Row>
              <Col lg={6}>
                <Form.Group controlId="formBasicName">
                  <Form.Label>Imie</Form.Label>
                  <Form.Control type="text" placeholder="Imie" name="firstName" value={this.state.newUserData.firstName} onChange={(e) => {
                    let { newUserData } = this.state;
                    newUserData.firstName = e.target.value;
                    this.setState({ newUserData });

                  }} />
                </Form.Group>

              </Col>
              <Col lg={6}>
                <Form.Group controlId="formBasicLastName">
                  <Form.Label>Nazwisko</Form.Label>
                  <Form.Control type="text" placeholder="Nazwisko" name="lastName" value={this.state.newUserData.lastName} onChange={(e) => {
                    let { newUserData } = this.state;
                    newUserData.lastName = e.target.value;
                    this.setState({ newUserData });

                  }} />
                </Form.Group>

              </Col>
            </Row>
            <Form.Group controlId="formBasicNick">
              <Form.Label>Login</Form.Label>
              <Form.Control type="text" placeholder="Login" name="login" value={this.state.newUserData.login} onChange={(e) => {
                let { newUserData } = this.state;
                newUserData.login = e.target.value;
                this.setState({ newUserData });

              }} />

            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Adres Email</Form.Label>
              <Form.Control type="email" placeholder="Adres email" name="email" value={this.state.newUserData.email} onChange={(e) => {
                let { newUserData } = this.state;
                newUserData.email = e.target.value;
                this.setState({ newUserData });

              }} />
            </Form.Group>

            <Form.Group controlId="formBasicPhone">
              <Form.Label>Numer telefonu</Form.Label>
              <Form.Control type="text" placeholder="Numer telefonu" name="phoneNumber" value={this.state.newUserData.phoneNumber} onChange={(e) => {
                let { newUserData } = this.state;
                newUserData.phoneNumber = e.target.value;
                this.setState({ newUserData });

              }} />
            </Form.Group>

            <Form.Group controlId="formBasicPassowrd">
              <Form.Label>Hasło</Form.Label>
              <Form.Control type="password" placeholder="Hasło" name="password" value={this.state.newUserData.password} onChange={(e) => {
                let { newUserData } = this.state;
                newUserData.password = e.target.value;
                this.setState({ newUserData });

              }} />
            </Form.Group>

            <Form.Group controlId="formBasicPassowrd">
              <Form.Label>Powtórz hasło</Form.Label>
              <Form.Control type="password" placeholder="Powtórz hasło" name="password_copy" />
            </Form.Group>
            <Button variant="primary" size="md" type="submit" block onClick={this.addUser.bind(this)}>
              Zarejestruj
                    </Button>
          </Form>
          <p className="rej1">Masz już konto?</p>
           <Link to="/login" class="rej1">Zaloguj sie</Link>
          <div className="clearfix"></div>
        </div>
      </div>
    );
  }
}

export default register;
