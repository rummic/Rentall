import React, { Component } from 'react';
import './register.css';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import swal from 'sweetalert';

const emailRegex = RegExp(/^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/);
const phoneRedex = RegExp(/(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)/);
const passwordRedex = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}/)

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });
  
  Object.values(rest).forEach(val => {
    val === null && (valid = false)
  });
  return valid;
}

class register extends Component {

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
      formErrors: {
        login: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
      },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();

    if (!formValid(this.state)) {
      swal("Błędne dane!", "Popraw wymagane dane!", "error");
    }
  };

  handleChange = e => {
    e.preventDefault();

    const { name, value } = e.target;
    let formErrors = this.state.formErrors;

    switch (name) {
      case 'firstName':
        formErrors.firstName = value.length < 3 && value.length > 0 ? 'Wymagane minimum 3 znaki' : "";
        break;
      case 'lastName':
        formErrors.lastName = value.length < 2 && value.length > 0 ? 'Wymagane minimum 2 znaki' : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value) ? "" : "Błędny adres e-mail";
        break;
      case "phoneNumber":
        formErrors.phoneNumber = phoneRedex.test(value) ? "" : "Błędny numer telefonu";
        break;
      case "password":
        formErrors.password = passwordRedex.test(value) ? "" : "Wymagane minimum 6 znaków,jedna duża litera,jedna mała litera oraz jedna cyfra";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value })
  }

  addUser() {
    if (formValid(this.state)) {
      fetch('https://localhost:44359/api/Users', {
        method: 'POST',
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
      }).then((result) => {
        if (result.hasErrors) {
            
        } else {
          fetch('https://localhost:44359/api/Users/Authenticate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              "login": this.state.login,
              "password": this.state.password,
            })
            }).then(res => res.json())
            .then((result) => {
              sessionStorage.setItem('login',result.value.login);
              sessionStorage.setItem('token',result.value.token);
              sessionStorage.setItem('id',result.value.id);
              this.props.history.push("/index")
            })
          }
      })
    }
  }

  render() {
    const { formErrors } = this.state;


    if (sessionStorage.getItem("token")) {
      return (<Redirect to={'/index'} />)
    }
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
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col lg={6}>
                <Form.Group controlId="formBasicName">
                  <Form.Label>Imie</Form.Label>
                  <Form.Control type="text" required placeholder="Imie" name="firstName" onChange={this.handleChange} />
                  {formErrors.firstName.length > 0 && (
                    <span className="errorMessage">{formErrors.firstName}</span>
                  )}
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group controlId="formBasicLastName">
                  <Form.Label>Nazwisko</Form.Label>
                  <Form.Control type="text" required placeholder="Nazwisko" name="lastName" onChange={this.handleChange} />
                  {formErrors.lastName.length > 0 && (
                    <span className="errorMessage">{formErrors.lastName}</span>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="formBasicNick">
              <Form.Label>Login</Form.Label>
              <Form.Control type="text" required placeholder="Login" name="login" onChange={this.handleChange} />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Adres Email</Form.Label>
              <Form.Control type="email" required placeholder="Adres email" name="email" onChange={this.handleChange} />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </Form.Group>
            <Form.Group controlId="formBasicPhone">
              <Form.Label>Numer telefonu</Form.Label>
              <Form.Control type="text" required placeholder="Numer telefonu" name="phoneNumber" onChange={this.handleChange} />
              {formErrors.phoneNumber.length > 0 && (
                <span className="errorMessage">{formErrors.phoneNumber}</span>
              )}
            </Form.Group>
            <Form.Group controlId="formBasicPassowrd">
              <Form.Label>Hasło</Form.Label>
              <Form.Control type="password" required placeholder="Hasło" name="password" onChange={this.handleChange} />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </Form.Group>
            <Button variant="primary" size="md" type="submit" block onClick={this.addUser.bind(this)}>Zarejestruj</Button>
          </Form>
          <p className="rej1">Masz już konto?</p>
          <Link to="/login" className="rej1">Zaloguj sie</Link>
          <div className="clearfix"></div>
        </div>
      </div>
    );
  }
}

export default register;