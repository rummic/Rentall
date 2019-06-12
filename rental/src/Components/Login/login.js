import React, { Component } from 'react';
import './login.css';
import { Form, Button, Row, Col, FormGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: "",
    }
    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  login() {
    fetch('https://localhost:44359/api/Users/Authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "login": this.state.login,
        "password": this.state.password
      })
    }).then(response => response.json())
      .then(parseJSON => {
        if (parseJSON.hasErrors) {
          document.getElementById("badLogin").innerHTML = parseJSON.errors;
          document.getElementById("badLogin").style.color = "red";
        }
        else {
          sessionStorage.setItem('login', parseJSON.value.login);
          sessionStorage.setItem('token', parseJSON.value.token);
          sessionStorage.setItem('id', parseJSON.value.id);
          this.props.history.push("/index")
        }
      })
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })

  }

  render() {
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
                <p>RentAll &ensp; Logowanie</p>
              </Col>
            </Row>
            <p className="log">Zaloguj sie</p>
            <p className="nap">Aby korzystać z usług RentAll musisz zalogować się na swoje konto na portalu RentAll</p>
          </div>
          <Form.Group controlId="formBasicLogin">
            <Form.Label>Login</Form.Label>
            <Form.Control type="text" required placeholder="Login" name="login" onChange={this.onChange} />
          </Form.Group>
          <Form.Group controlId="formBasicPassowrd">
            <Form.Label>Hasło</Form.Label>
            <Form.Control type="password" required placeholder="Hasło" name="password" onChange={this.onChange} />
          </Form.Group>
          <FormGroup>
            <p id="badLogin"></p>
          </FormGroup>
          <Button variant="primary" size="md" type="submit" block onClick={this.login}>
            Zaloguj
          </Button>
        </div>

        <div className="formboxre">
          <div className="rej">Nie masz konta ?</div>
          <div className="rej1">Czas je założyć</div>
          <div className="rej1"><Link to="/register">Zarejestruj sie</Link></div>
          <div className="clearfix"></div>
        </div>
      </div>
    );
  }
}

export default login;
