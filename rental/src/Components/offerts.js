import React, { Component } from 'react';
import './offerts.css';
import { Button, Navbar, NavDropdown, Nav, Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class offerts extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      price: "",
      area: 0,
      mapLink: "",
      level: 0,
      roomCount: 0,
      city: "",
      street: "",
      zipCode: "",
      categoryId: 1,
      offerTypeId: 1,
      userLogin: sessionStorage.getItem('login'),
      files: [1],
      category: [],
      offerType: []
    }
    this.onChange = this.onChange.bind(this);
    this.logout = this.logout.bind(this);
  };

  componentDidMount() {
    fetch('https://localhost:44359/api/Categories')
      .then(response => response.json())
      .then(parseJSON => {
        this.setState({
          category: parseJSON.value
        })
      })

    fetch('https://localhost:44359/api/OfferTypes')
      .then(response => response.json())
      .then(parseJSON => {
        this.setState({
          offerType: parseJSON.value
        })
      })

  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  addFile() {
    const imageCount = 5;
    if (this.state.files.length < imageCount) {
      this.setState({ files: [...this.state.files, ''] });
    }
    if (this.state.files.length === imageCount - 1) {
      document.getElementById("add").style.display = "none";
    }
  }

  handleChange(e, index) {
    this.state.files[index] = e.target.files[0];
    this.setState({ files: this.state.files });
  }

  logout() {
    sessionStorage.clear();
    this.props.history.push("/home")
  }


  addOffer() {
    fetch('https://localhost:44359/api/Offers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({

        "title": this.state.title,
        "description": this.state.description,
        "price": this.state.price,
        "area": this.state.area,
        "mapLink": this.state.mapLink,
        "level": this.state.level,
        "roomCount": this.state.roomCount,
        "city": this.state.city,
        "street": this.state.street,
        "zipCode": this.state.zipCode,
        "categoryId": this.state.categoryId,
        "offerTypeId": this.state.offerTypeId,
        "userLogin": sessionStorage.getItem('login')

      })
    }).then(res => res.json())
      .then(data => {
        if (this.state.files.length > 0) {
          var filesArray = this.state.files;

          for (let i = 0; i < this.state.files.length; i++) {

            let formData = new FormData();

            formData.append('photo', filesArray[i]);

            axios({
              url: 'https://localhost:44359/api/Photos/' + data.value,
              method: 'POST',
              headers: { 'Content-Type': 'multipart/form-data' },
              data: formData
            })

            //console.log("dodano " + (i+1)+" zdjecie");
          }
          alert("Oferta dodana poprawnie");
        }
        else {
          alert("Proszę wybrać zdjęcie");
        }
      })

  }

  render() {

    if (!sessionStorage.getItem("token")) {
      return (<Redirect to={'/home'} />)
    }

    return (
      <div className="box">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/index">RentAll</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown title="Menu" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/addOffer">Dodaj oferte</NavDropdown.Item>
                <NavDropdown.Item href="/alloff">Oferty</NavDropdown.Item>
                <NavDropdown.Item href="#">Ustawienia</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          <Form inline>
            <Navbar.Text className=" mr-sm-2">
              Zalogowany jako : <b className="login"> {sessionStorage.getItem('login')} </b>
            </Navbar.Text>
            <Button className="logout" variant="outline-light" size="sm" onClick={this.logout}>Logout</Button>
          </Form>
        </Navbar>
        <div className="clearfix"></div>
        <div className="contentbox1">

          <div className="offerts1">
            <div className="title">RentAll - dodaj nowe ogłoszenie </div>
            <div className="section1">
              <label>Tytuł</label>
              <input type="text" placeholder="Podaj tytuł" name="title" onChange={this.onChange} />
            </div>
            <div className="clearfix"></div>
            <div className="section1">
              <label>Kategoria</label>
              <select className="arrow" value={this.state.categoryId} name="categoryId" onChange={this.onChange} >
                {
                  this.state.category.map(item => (
                    <option key={item.name} value={item.id}>{item.name}</option>

                  ))
                }
              </select>
            </div>
            <div className="clearfix"></div>
          </div>
          <div className="offerts1">
            <div className="subtitle">Podstawowe informacje</div>
            <div className="subsection">
              <label>Rodzaj ogłoszenia</label>
              <div>
                <select name="offerTypeId" onChange={this.onChange} >
                  {
                    this.state.offerType.map(item => (
                      <option key={item.type} value={item.id}>{item.type}</option>

                    ))
                  }
                </select>
              </div>
            </div>
            <div className="subsection">
              <label>Powierzchnia</label>
              <div>
                <input type="number" name="area" onChange={this.onChange} />
              </div>
            </div>
            <div className="subsection">
              <label>Piętro</label>
              <div>
                <input type="number" name="level" onChange={this.onChange} />
              </div>
            </div>
            <div className="clearfix"></div>
            <div className="subsection">
              <label>Liczba pokoi</label>
              <div>
                <input type="text" name="roomCount" onChange={this.onChange} />
              </div>
            </div>
            <div className="subsection">
              <label>Cena</label>
              <div>
                <input type="number" name="price" onChange={this.onChange} />
              </div>
            </div>
            <div className="text">
              <label>Opis</label>
              <div>
                <textarea rows="8" name="description" onChange={this.onChange} ></textarea>
              </div>
            </div>

            <div className="clearfix"></div>
          </div>
          <div className="offerts1">
            <div className="subtitle">Lokalizacja</div>
            <div className="subsection">
              <label>Miejscowosc</label>
              <div>
                <input type="text" name="city" onChange={this.onChange} />
              </div>
            </div>
            <div className="subsection">
              <label>Ulica</label>
              <div>
                <input type="text" name="street" onChange={this.onChange} />
              </div>
            </div>

            <div className="subsection">
              <label>Kod pocztowy</label>
              <div>
                <input type="text" name="zipCode" onChange={this.onChange} />
              </div>
            </div>
            <div className="clearfix"></div>
          </div>

          <div className="offerts1">
            <div className="subtitle">Dodaj zdjęcia</div>
            <div>
              {
                this.state.files.map((file, index) => {
                  return (
                    <div key={index} className="addImage">
                    <label className="btn btn-primary">Wybierz&hellip;
                      <input className="inputImage" type="file" name="photo" onChange={(e) => this.handleChange(e, index)} value={this.state.file} />
                      </label>
                    </div>
                  )
                })

              }
              
                <div className="addButton">
                  <button type="button" id="add" onClick={(e) => this.addFile(e)} className="btn btn-success btn-number" data-type="plus" data-field="quant[2]">
                    <span className="glyphicon glyphicon-plus"></span>
                  </button>
                </div>
      
            </div>
              <div className="but"><button onClick={this.addOffer.bind(this)}>Dodaj</button></div>
              <div className="clearfix"></div>
            </div>
          </div>
        </div>

        );
      }
    }
export default offerts;