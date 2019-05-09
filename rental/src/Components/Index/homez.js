import React, { Component } from 'react';
import '../MainPage/home.css';
import logo from '../../fotos/back.jpg'
import { Redirect } from 'react-router-dom';
import NavbarIndex from '../Navbar/indexNav';

class homez extends Component {

    render() {
        if (!sessionStorage.getItem("token")) {
            return (<Redirect to={'/home'} />)
        }
        return (
            <div className="box">
                <NavbarIndex history={this.props.history}/>
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
                        <input type="text" placeholder="Miejscowość" />
                        <button value="wyszukaj">Wyszukaj</button>
                    </div>
                </div>
                <div className="offerts">
                    <p className="random">Przykładowe nasze oferty</p>
                    <div className="offert">
                        <div className="ofer"><img src={logo} alt="as" />jakiś tam opisik<div className="cost">144zł</div></div>
                        <button>Szczegóły</button>
                    </div>
                    <div className="offert">
                        <div className="ofer"><img src={logo} alt="as" />jakiś tam opisik<div className="cost">144zł</div></div>
                        <button>Szczegóły</button>
                    </div>
                    <div className="offert">
                        <div className="ofer"><img src={logo} alt="as" />jakiś tam opisik<div className="cost">144zł</div></div>
                        <button>Szczegóły</button>
                    </div>
                </div>
            </div >

        );
    }
}
export default homez;