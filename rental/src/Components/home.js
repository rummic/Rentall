import React, { Component } from 'react';
import './home.css';
import logo from '../fotos/back.jpg'
import {Link} from 'react-router-dom';

class home extends Component {
    render() {
      return (
          <div className="box">
          <div className="navBar">
          <div className="navBarCon">
          <ul>
              <li className="logo"><Link to="/">Rentall</Link></li>
              <li><a>Oferty</a></li>
              <li className="options"><Link to="/login" className="options">Log in</Link></li>
              <li className="options"><Link to="/register">Register</Link></li>
          </ul>
          </div>
          </div>
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