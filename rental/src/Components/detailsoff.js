import React, { Component } from 'react';
import './detailsoff.css';
import { Button, Navbar, NavDropdown, Nav, Form,Carousel } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

class detailsoff extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      login: "",
      offerts: [],
      zdjecia : []

    }
    this.logout = this.logout.bind(this);
  }

  componentWillMount() {
    if (!sessionStorage.getItem("value")) {
      this.setState({ redirect: true });
    }

    fetch('https://localhost:44359/api/Offers/user/' + sessionStorage.getItem('login'))
      .then(response => response.json())
      .then(parseJSON => {
        this.setState({
          offerts: parseJSON.value,
          zdjecia: parseJSON.value[this.props.match.params.id].photos
        })
      })


  }

  logout() {
    sessionStorage.setItem("value", '');
    sessionStorage.clear();
    this.setState({ redirect: true });
  }

  wyswietlanie() {
    const obj = this.state.offerts[this.props.match.params.id];
    const path = "https://localhost:44359/"
    if (obj != null) {
      document.getElementsByClassName("offertitle")[0].innerHTML = obj.title;
      document.getElementsByClassName("offerprice")[0].innerHTML = obj.price +" zł";
      document.getElementsByClassName("opis")[0].innerHTML = obj.description; 
      document.getElementsByClassName("offerinfo")[0].innerHTML = "<b>"+obj.city+", "+obj.street+", "+"</b>"+"</br>"+"Powierzchnia : "+obj.area +" m²"+"</br>"+"Piętro : "+obj.level +"</br>" +"Liczba pokoi : "+obj.roomCount +"</br>"+"Kategoria : "+obj.categoryName +"</br>" +"Rodzaj ogłoszenia : " + obj.offerTypeType 
    }
  }


  render() {
    if (this.state.redirect) {
      return (<Redirect to={'/index'} />)
    }
    if (!sessionStorage.getItem("value")) {
      return (<Redirect to={'/index'} />)
    }
    return (
      <div className="box">
        {
          this.wyswietlanie()
        }
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
        <div className="offertbox">
          <div className="offerttop">
            <div className="offertitle">Tytuł wpisany w formularzu</div>
            <div className="offerfoto">
            
            <Carousel>
           {
             this.state.zdjecia.map(function(item, i){
              return <Carousel.Item key={i}>
              <img 
                className="d-block w-100"
                src={"https://localhost:44359/"+item}
                alt="First slide"
              />
            </Carousel.Item>

             })


           }
            </Carousel>
            </div>
            <div className="titleOffer">Podstawowe informacje<hr/></div>
            <div className="offerdesc">
            
            <div className="offerinfo">
            
            </div>
            <div className="offerinfo">
            
            </div>
              <div className="offerprice">Cena</div>
              
              <button >Wynajmij</button>
            </div>
            <div className="clearfix"></div>
          </div>
          <div className="titleOffer">Opis ogłoszenia<hr/></div>
          <div className="offerdet">
          
            <div className="opis"></div>
            
          </div>
          <div className="clearfix"></div>
        </div>
      </div>
    );
  }
}
export default detailsoff;