import React, { Component } from 'react';
import './login.css';
import { Form, Button, Row, Col, FormGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PostData } from "../Helpers/postData";
import {Redirect} from 'react-router-dom';

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
    if (this.state.login && this.state.password) {
      PostData('Authenticate', this.state).then((result) => {
        let responseJSON = result;
        
        if (responseJSON.value) {
          sessionStorage.setItem('login',responseJSON.value.login);
          sessionStorage.setItem('token',responseJSON.value.token);
          this.props.history.push("/index")

        } else {
          document.getElementById("badLogin").innerHTML = "Błędne dane logowania";
          document.getElementById("badLogin").style.color = "red";
        }
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })

  }

  render() {
    if(sessionStorage.getItem("token")){
      return(<Redirect to={'/index'}/>) 
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
            <a>Aby korzystać z usług RentAll musisz zalogować się na swoje konto na portalu RentAll</a>

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