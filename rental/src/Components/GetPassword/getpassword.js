import React, { Component } from "react";
import { Form, Button, Row, Col, ButtonGroup } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import "./getpassword.css";
import Swal from 'sweetalert';
class getpassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
 
      mail: "",

    };
    this.getpassword = this.getpassword.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  
  getpassword() {
    Swal({
      title: 'Wysyłanie...',
      showConfirmButton: false,
      timer: 3000
    })
    fetch("https://localhost:44359/api/Users/resetPassword",  {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        mail: this.state.mail,

      })
    })
      .then(response => response.json())
      .then(parseJSON => {
        if (parseJSON.hasErrors) {
          Swal({
            type: 'error',
            title: 'Błąd',
            text: 'Podany mail jest niepoprawny',
          })
        } else {
          this.props.history.push("/login");
          Swal({
            type: 'success',
            title: 'Sukces',
            text: 'Mail został wysłany',
          })
        }
      });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    if (sessionStorage.getItem("token")) {
      return <Redirect to={"/index"} />;
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
                <p>RentAll &ensp; Przypomnienie hasła</p>
              </Col>
            </Row>

            <p className="log">Przypomnij hasło</p>
            <a>Zapomniałeś hasła ? Przypomnij je sobie tutaj wpisując maila</a>

          </div>

            <Form.Group>
           <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              placeholder="mail"
              name="mail"
              onChange={this.onChange}
            />
          </Form.Group>
          <Button variant="primary" size="md" type="submit" block onClick={this.getpassword}>
            Przypomnij hasło
                    </Button>
                    <Button variant="primary" size="md" type="submit" block href="/login">
                    Powrót
                    </Button>


        </div>
      </div>
    );
  }
}

export default getpassword;
