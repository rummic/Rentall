import React, { Component } from 'react';
import './home.css';
import logo from '../../fotos/back.jpg'
import { Button, Navbar, Form,ButtonGroup } from 'react-bootstrap';
import NumberFormat from 'react-number-format';

class home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search : "",
            offerts: []
        }
        this.onChange = this.onChange.bind(this);
        this.searchOffer = this.searchOffer.bind(this);
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
        
      }

      searchOffer(){
        if(this.state.search !==undefined){
            fetch('https://localhost:44359/api/Offers/Query/' + this.state.search)
            .then(response => response.json())
            .then(parseJSON => {
                this.setState({
                    offerts: parseJSON.value || []
                })
            })
        }
        
      }

      showOfferts(){
          if(this.state.offerts.length>0){
              return(
                this.state.offerts.map((item, i) => (
                    <div className="offcon" key={i}>
                        <div className="offoto"><img src={"https://localhost:44359/" + item.photos[0]} alt="foto" /></div>
                        <div className="ofdesc">{item.title}<hr />
                            <div className="ofinf">
                                <div className="localization"> {item.city}, {item.street}</div>
                                <ul>
                                    <li>Powierzchnia : {item.area} m²</li>
                                    <li>Piętro : {item.level}</li>
                                    <li>Liczba pokoi : {item.roomCount}</li>
                                    <li>Kategoria : {item.categoryName}</li>
                                    <li>Rodzaj ogłoszenia : {item.offerTypeType}</li>
                                </ul>

                            </div>
                        </div>
                        <div className="ofdes">
                            <div className="ofprice"><NumberFormat value={item.price} displayType={'text'} thousandSeparator={' '} /> zł</div>
                            <div className="ofbutton"><Button disabled href={"/detailsoff/" + i}>Szczegóły</Button></div>
                        </div>
                        <div className="clearfix"></div>
                    </div>

                ))
              )
          }
      }
    render() {
      return (
          <div className="box">  
           <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/index">RentAll</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">    
          </Navbar.Collapse>
          <Form inline>
          <ButtonGroup aria-label="Basic example">
          <Button variant="outline-warning" href="/login" size="sm" >Login</Button>
          <Button variant="outline-warning" href="/register" size="sm" >Register</Button>
          </ButtonGroup>
          </Form>
        </Navbar>
          <div className="clearfix"></div>
            <div className="contentbox">
                <div className="description">U nas możesz wynająć nawet budę</div>
                <div className="subdescription">wyszukaj interesujących cię ofert</div>
                    <div className="searchbox arrow">
                        <input type="text" placeholder="Wyszukaj" name="search" onChange={this.onChange} />
                        <button value="wyszukaj" onClick={this.searchOffer}>Wyszukaj</button>
                    </div>
                    </div> 
                    {
                        this.showOfferts()
                    }           
                    <div className="offerts">
                    <p className="random">Przykładowe nasze oferty</p>
                    <div className="offert">
                    <div className="ofer"><img src={logo} alt="as"/>jakiś tam opisik<div className="cost">144zł</div></div>
                    <button>Szczegóły</button>
                    </div>
                    <div className="offert">
                    <div className="ofer"><img src={logo} alt="as"/>jakiś tam opisik<div className="cost">144zł</div></div>
                    <button>Szczegóły</button>
                    </div>
                    <div className="offert">
                    <div className="ofer"><img src={logo} alt="as"/>jakiś tam opisik<div className="cost">144zł</div></div>
                    <button>Szczegóły</button>
                    </div>
                    </div>
          </div>
      );
    }
}
export default home;