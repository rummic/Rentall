import React, { Component } from 'react';
import './accsettings.css';
import { Breadcrumb } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import NavbarIndex from '../Navbar/indexNav';

const token = sessionStorage.getItem("token");

class accsettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      role: "User",
      user: []
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  componentDidMount() {
    fetch('https://localhost:44359/api/Users/' + sessionStorage.getItem('id'), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `bearer ${token}`
      },
    }).then(response => response.json())
      .then(parseJSON => {
        this.setState({
          firstName: parseJSON.value.firstName,
          lastName: parseJSON.value.lastName,
          email: parseJSON.value.email,
          phoneNumber: parseJSON.value.phoneNumber,
        })
      })
  }

  update() {
    fetch('https://localhost:44359/api/Users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `bearer ${token}`
      },
      body: JSON.stringify({
        "login": sessionStorage.getItem('login'),
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
        if(parseJSON.hasErrors){
          alert(parseJSON.errors)
        }else{
          alert("Poprawnie zmieniono dane")
          this.props.history.push("/index")
        }
      })
      
  }

  render() {
    if (!sessionStorage.getItem("token")) {
      return (<Redirect to={'/home'} />)
    }
    return (
      <div className="box">
        <NavbarIndex history={this.props.history} />
        <div className="clearfix"></div>
        <div className="contentbox1">
          <div className="offerts1">
            <Breadcrumb>
              <Breadcrumb.Item href="/index">RentAll</Breadcrumb.Item>
              <Breadcrumb.Item active>Ustawienia</Breadcrumb.Item>
            </Breadcrumb>
            <div className="title">Ustawienia </div>
            <div className="section1">
              <label>Imie</label>
              <input type="text" value={this.state.firstName} name="firstName" onChange={this.onChange} />
            </div>
            <div className="clearfix"></div>
            <div className="section1">
              <label>Nazwisko</label>
              <input type="text" value={this.state.lastName} name="lastName" onChange={this.onChange} />
            </div>
            <div className="section1">
              <label>Email</label>
              <input type="text" value={this.state.email} name="email" onChange={this.onChange} />
            </div>
            <div className="section1">
              <label>Numer telefonu</label>
              <input type="text" value={this.state.phoneNumber} name="phoneNumber" onChange={this.onChange} />
            </div>
            <div className="section1">
              <label>Hasło</label>
              <input type="password" placeholder="Podaj hasło" name="password" onChange={this.onChange} />
            </div>
            <div className="clearfix"></div>
          </div>
          <div className="but"><button variant="primary" onClick={this.update.bind(this)}>Zmień dane</button></div>
        </div>
      </div>
    );
  }
}

export default accsettings;