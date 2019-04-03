import React, { Component } from 'react';
import './offerts.css';
import { Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class offerts extends Component {

    state = {
        offer: [],
        newOfferData: {
            title: "",
            description: "",
            price: "",
            area: "",
            mapLink: "",
            level: "",
            roomCount:"",
            city: "",
            street: "",
            zipCode: "",
            categoryId: "",
            offerTypeId: "",
            userLogin: ""
        }
    
      }
    
    
      addOffer() {
        fetch('https://localhost:44359/api/Offers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
           
            "title": this.state.newOfferData.title,
            "description": this.state.newOfferData.description,
            "price": this.state.newOfferData.price,
            "area": this.state.newOfferData.area,
            "mapLink": this.state.newOfferData.mapLink,
            "level": this.state.newOfferData.level,
            "roomCount":this.state.newOfferData.roomCount,
            "city": this.state.newOfferData.categoryId,
            "street": this.state.newOfferData.street,
            "zipCode": this.state.newOfferData.zipCode,
            "categoryId": this.state.newOfferData.categoryId,
            "offerTypeId": this.state.newOfferData.offerTypeId,
            "userLogin": this.state.newOfferData.userLogin

          })
        });

      }

    
    render() {
      return (
        <div className="box">
        <div className="navBar">
        <div className="navBarCon">
        <ul>
              <li className="logo"><Link to="/index">RentAll</Link></li>
              <li><a>Oferty</a></li>
              <li className="options"><span className="menu"><Button className="logout" variant="info" onClick={this.logout}>Logout</Button></span></li>
              <li className="options" ><Link to="/addOffer">Dodaj oferte</Link><p className="optionss" > </p></li>
              
          </ul>
        </div>
        </div>
        <div className="clearfix"></div>
        <div className="contentbox">
        <div className="offerts">
            <div className="title">RentAll - dodaj nowe ogłoszenie</div>
            <div className="section">
            <label>Tytuł</label>
            <input type="text" placeholder="Podaj tytuł" name="title" value={this.state.newOfferData.title} onChange={(e) => {
                    let { newOfferData } = this.state;
                    newOfferData.title = e.target.value;
                    this.setState({ newOfferData });                
                  }}/>
            </div>
            <div className="clearfix"></div>
            <div className="section">
            <label>Kategoria</label>
            <select className="arrow" name="categoryId" value={this.state.newOfferData.categoryId} onChange={(e) => {
                    let { newOfferData } = this.state;
                    newOfferData.categoryId = e.target.value;
                    this.setState({ newOfferData });                
                  }}>
                            <option value="1">Mieszkanie</option>
                            <option value="2">Dom</option>
            </select>
            </div>
            <div className="clearfix"></div>
        </div>
        <div className="offerts">
        <div className="subtitle">Podstawowe informacje</div>
        <div className="subsection">
            <label>Rodzaj ogłoszenia</label>
            <div>
            <select className="arrow" name="offerTypeId" value={this.state.newOfferData.offerTypeId} onChange={(e) => {
                    let { newOfferData } = this.state;
                    newOfferData.offerTypeId = e.target.value;
                    this.setState({ newOfferData });                
                  }}>
                            <option value="1">Sprzedaż</option>
                            <option value="2">Zamiana</option>
            </select>
            </div>
            </div>
            <div className="subsection">
            <label>Powierzchnia</label>
            <div>
            <input type="number" name="area" value={this.state.newOfferData.area} onChange={(e) => {
                    let { newOfferData } = this.state;
                    newOfferData.area = e.target.value;
                    this.setState({ newOfferData });                
                  }}/>
            </div>
            </div>
            <div className="subsection">
            <label>Piętro</label>
            <div>
            <input type="number" name="level" value={this.state.newOfferData.level} onChange={(e) => {
                    let { newOfferData } = this.state;
                    newOfferData.level = e.target.value;
                    this.setState({ newOfferData });                
                  }}/>
            </div>
            </div>
            <div className="clearfix"></div>
            <div className="subsection">
            <label>Liczba pokoi</label>
            <div>
            <input type="text" name="roomCount" value={this.state.newOfferData.roomCount} onChange={(e) => {
                    let { newOfferData } = this.state;
                    newOfferData.roomCount = e.target.value;
                    this.setState({ newOfferData });                
                  }}/>
            </div>
            </div>
            <div className="subsection">
            <label>Cena</label>
            <div>
            <input type="number" name="price" value={this.state.newOfferData.price} onChange={(e) => {
                    let { newOfferData } = this.state;
                    newOfferData.price = e.target.value;
                    this.setState({ newOfferData });                
                  }}/>
            </div>
            </div>
            <div className="text">
            <label>Opis</label>
            <div>
            <textarea rows="8" name="description" value={this.state.newOfferData.description} onChange={(e) => {
                    let { newOfferData } = this.state;
                    newOfferData.description = e.target.value;
                    this.setState({ newOfferData });                
                  }}></textarea>
            </div>
            </div>
            
            <div className="clearfix"></div>
        </div>
        <div className="offerts">
            <div className="subtitle">Dodaj zdjęcia</div>
            <div>
            <input type="file" accept="image/*" multiple/>
            </div>
            <div className="but"><button onClick={this.addOffer}>Dodaj</button></div>
            <div className="clearfix"></div>
        </div>
        </div>
        </div>
      );
    }
}
export default offerts;