import React, { Component } from 'react';
import './home.css';
import logo from '../../fotos/back.jpg'
import { Button, Navbar, Form,ButtonGroup } from 'react-bootstrap';

class home extends Component {
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
                        <select>
                            <option value="mieszkanie">Mieszkanie</option>
                            <option value="dom">Dom</option>
                        </select>
                        <select>
                            <option value="kupno">Kupno</option>
                            <option value="wynajem">Wynajem</option>
                        </select>
                        <input type="text" placeholder="Miejscowość"  />
                        <button value="wyszukaj">Wyszukaj</button>
                    </div>
                    </div>            
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