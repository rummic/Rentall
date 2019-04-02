import React, { Component } from 'react';
import './home.css';
import logo from '../fotos/back.jpg'

class home extends Component {
    render() {
      return (
          <div className="box">
          <div className="navBar">
          <div className="navBarCon">
          <ul>
              <li className="logo"><a>RentAll</a></li>
              <li><a>Oferty</a></li>
              <li className="options"><a>Zaloguj</a></li>
              <li className="options"><a>Zarejestruj</a></li>
          </ul>
          </div>
          </div>
          <div className="clearfix"></div>
            <div className="contentbox">
                <div className="description"><p >U nas możesz wynająć nawet budę</p></div>
                <div className="subdescription"><p>wyszukaj interesujących cię ofert</p></div>
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
                    <img src={logo} alt="as"/><p>jakiś tam opisik</p><p className="cost">144zł</p>
                    <button>Szczegóły</button>
                    </div>
                    <div className="offert">
                    <img src={logo}alt="as"/><p>jakiś tam opisik</p><p className="cost">144zł</p>
                    <button>Szczegóły</button>
                    </div>
                    <div className="offert">
                    <img src={logo} alt="as"/><p>jakiś tam opisik</p><p className="cost">144zł</p>
                    <button>Szczegóły</button>
                    </div>
                    </div>
          </div>
      );
    }
}
export default home;