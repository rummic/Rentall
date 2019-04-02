import React, { Component } from 'react';
import './login.css';
import { Form,Button,Row,Col } from 'react-bootstrap';

class login extends Component {
    render() {
      return (
       /* fetch('http://localhost:53965/api/values')
        .then(response => (response.json())
        .then(values => console.log({ values }))),*/
          <div className="fomrconatiner">
              <div className="formbox">
                <div className="formtext">
                        <Row>
                        <Col md={1}>
                        <a href="javascript:void(0);"><h1>&lsaquo;</h1></a>
                        </Col>
                        <Col md={10}>
                            <p>RentAll &ensp; Logowanie</p>
                        </Col>
                        </Row>

                        <p className="log">Zaloguj sie</p>
                        <a>Aby korzystać z usług RentAll musisz zalogować się na swoje konto na portalu RentAll</a>

                    </div>
              <Form>
                    <Form.Group controlId="formBasicEmail">
                    <Form.Label>Adres Email</Form.Label>
                    <Form.Control type="email" placeholder="Adres email" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassowrd">
                    <Form.Label>Hasło</Form.Label>
                    <Form.Control type="password" placeholder="Hasło" />
                    </Form.Group>
                    <Button variant="primary" size ="md" type="submit" block>
                    Zaloguj
                    </Button>
                </Form>
              </div>
            <div className="formboxre">
                <p className="rej">Nie masz konta ?</p>
                <p className="rej1">Czas je założyć na portalu</p><a className="rej1" href="#">Zarejestruj sie</a>
                <div className="clearfix"></div>
            </div>
          </div>
      );
    }
  }
  
  export default login;
  