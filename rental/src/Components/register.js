import React, { Component } from 'react';
import './register.css';
import { Form,Button,Row,Col } from 'react-bootstrap';

class register extends Component {
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
                            <p>RentAll &ensp; Rejestracja</p>
                        </Col>
                        </Row>

                        <p class="log">Zarejestruj się</p>

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
                    <Form.Group controlId="formBasicPassowrd">
                    <Form.Label>Powtórz hasło</Form.Label>
                    <Form.Control type="password" placeholder="Hasło" />
                    </Form.Group>
                    <Button variant="primary" size ="md" type="submit" block>
                    Zarejestruj
                    </Button>
                </Form>
                <p class="rej1">Masz już konto?</p>
                <a href="#" class="rej1">Zaloguj sie</a>
                <div class="clearfix"></div>
              </div>
              </div>
      );
    }
  }
  
  export default register;
  