import React, { Component } from 'react';
import './accsettings.css';
import { Breadcrumb } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import NavbarIndex from '../Navbar/indexNav';
import swal from 'sweetalert';

const token = sessionStorage.getItem("token");

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
      user: [],
      formErrors: {
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
      },
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
    e.preventDefault();
    if (!formValid(this.state)) {
      swal("Błędne dane!", "Popraw wymagane dane!", "error");
    }
  }

  onChange = e => {
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
        if (parseJSON.hasErrors) {
          document.getElementById("badData").innerHTML = parseJSON.errors;
          document.getElementById("badData").style.color = "red";
        } else {
          swal("Dobra robota!", "Poprawnie zmieniono dane!", "success");
          this.props.history.push("/index")
        }
      })
  }

  showInput() {
    document.getElementById("password").style.display = "inline";
    document.getElementById("hideButton").style.display = "none"
  }
  render() {
    const { formErrors } = this.state;
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
            <p id="badData"></p>
            <div className="section1">
              <label>Imie</label>
              <input type="text" value={this.state.firstName} name="firstName" onChange={this.onChange} />
              {formErrors.firstName.length > 0 && (<span className="errorMessage">{formErrors.firstName}</span>)}
            </div>
            <div className="clearfix"></div>
            <div className="section1">
              <label>Nazwisko</label>
              <input type="text" value={this.state.lastName} name="lastName" onChange={this.onChange} />
              {formErrors.lastName.length > 0 && (<span className="errorMessage">{formErrors.lastName}</span>)}
            </div>
            <div className="section1">
              <label>Email</label>
              <input type="text" value={this.state.email} name="email" onChange={this.onChange} />
              {formErrors.email.length > 0 && (<span className="errorMessage">{formErrors.email}</span>)}
            </div>
            <div className="section1">
              <label>Numer telefonu</label>
              <input type="text" value={this.state.phoneNumber} name="phoneNumber" onChange={this.onChange} />
              {formErrors.phoneNumber.length > 0 && (<span className="errorMessage">{formErrors.phoneNumber}</span>)}
            </div>
            <div className="section1">
              <label>Hasło</label>
              <button id="hideButton" variant="primary" onClick={this.showInput} >Zmień hasło</button>
              <input type="password" id="password" placeholder="Podaj hasło" name="password" onChange={this.onChange} />
              {formErrors.password.length > 0 && (<span className="errorMessage">{formErrors.password}</span>)}
            </div>
            <div className="but"><button variant="primary" onClick={this.update.bind(this)}>Zmień dane</button></div>
            <div className="clearfix"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default accsettings;