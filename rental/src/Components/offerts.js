import React, { Component } from 'react';
import './offerts.css';
import { Button } from 'react-bootstrap';
import { Link,Redirect } from 'react-router-dom';

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
      redirect: false
    }
    this.onChange = this.onChange.bind(this);
  };


  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
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
    });
    this.setState({ redirect: true });
  }

  render() {

    if (this.state.redirect) {
      return (<Redirect to={'/index'} />)
    }


    return (
      <div className="box">
        <div className="navBar">
          <div className="navBarCon">
            <ul>
              <li className="logooff"><Link to="/index">RentAll</Link></li>
              <li><a>Oferty</a></li>
              <li className="options"><span className="menu"><Button className="logout" variant="info" onClick={this.logout}>Logout</Button></span></li>
              <li className="options" ><Link to="/addOffer">Dodaj oferte</Link><p className="optionss" > </p></li>

            </ul>
          </div>
        </div>
        <div className="clearfix"></div>
        <div className="contentbox1">

          <div className="offerts1">
            <div className="title">RentAll - dodaj nowe ogłoszenie </div>
            <div className="section">
              <label>Tytuł</label>
              <input type="text" placeholder="Podaj tytuł" name="title" onChange={this.onChange} />
            </div>
            <div className="clearfix"></div>
            <div className="section">
              <label>Kategoria</label>
              <select className="arrow" value={this.state.categoryId} name="categoryId" onChange={this.onChange} >
                <option value="1">Mieszkanie</option>
                <option value="2">Dom</option>
              </select>
            </div>
            <div className="clearfix"></div>
          </div>
          <div className="offerts1">
            <div className="subtitle">Podstawowe informacje</div>
            <div className="subsection">
              <label>Rodzaj ogłoszenia</label>
              <div>
                <select className="arrow" name="offerTypeId" onChange={this.onChange} >
                  <option value="1">Sprzedaż</option>
                  <option value="2">Zamiana</option>
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
            <div className="subtitle">Dodaj zdjęcia</div>
            <div>
              <input type="file" accept="image/*" multiple />
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