import React, { Component } from 'react';
import './login.css';
import { Form,Button,Row,Col } from 'react-bootstrap';

class login extends Component {
    render() {
      return (
          <div class="fomrconatiner">
              <div class="formbox">
                <div class="formtext">
                        <Row>
                        <Col md={1}>
                        <a href="javascript:void(0);"><h1>&lsaquo;</h1></a>
                        </Col>
                        <Col md={10}>
                            <p>RentAll &ensp; Logowanie</p>
                        </Col>
                        </Row>

                        <p class="log">Zaloguj sie</p>
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
            <div class="formboxre">
                <p class="rej">Nie masz konta ?</p>
                <p class="rej1">Czas je założyć na portalu</p><a class="rej1" href="#">Zarejestruj sie</a>
                <div class="clearfix"></div>
            </div>
          </div>
      );
    }
  }
  
  export default login;
  