import React, { Component } from 'react';
import './detailsoff.css';
import logo from '../fotos/back.jpg'


class detailsoff extends Component {

    render() {
      return (
<div className="box">
          <div className="navBar">
          <div className="navBarCon">
          <ul>
              <li className="logo"><a>RentAll</a></li>
              <li><a>Oferty</a></li>
              <li className="options"><a>Nazwa użytkownika</a></li>
              
          </ul>
          </div>
          </div>
          <div className="clearfix"></div>
            <div className="offertbox">
            <div className="offerttop">
            <div className="offertitle">Tytuł wpisany w formularzu</div>
            <div className="offerfoto"><img src={logo} alt="sss"/></div>
            <div className="offerdesc">
            <div className="offerprice">Cena</div>
            <button >Wynajmij</button>
            </div>
            <div className="clearfix"></div>
            </div>
            <div className="offerdet">
            <p>Opis wszystkiego</p>
            <img src={logo} alt="sss"/>
            </div>
            <div className="clearfix"></div>
            </div>
          </div>
                );
            }
        }
        export default detailsoff;