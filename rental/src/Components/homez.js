import React, { Component } from 'react';
import './home.css';
import logo from '../fotos/back.jpg'
import {Redirect} from 'react-router-dom';
import { Button} from 'react-bootstrap';

class homez extends Component {

    constructor(props){
        super(props);
        this.state={
            redirect : false,
            login : ""         
        }
        this.logout= this.logout.bind(this);
    }

componentWillMount(){
    if(sessionStorage.getItem("value")){
        console.log("zal");
    }else{
        this.setState({redirect : true});
    }
}

logout(){
    sessionStorage.setItem("value",'');
    sessionStorage.clear();
    this.setState({redirect : true});
}



    render() {

        

        if(this.state.redirect){
            return (<Redirect to={'/login'}/>)
        }
      return (
          <div className="box">
          <div className="navBar">
          <div className="navBarCon">
          <ul>
              <li className="logo"><a>RentAll</a></li>
              <li><a>Oferty</a></li>
              <li className="options"><span className="menu"><Button className="logout" variant="info" onClick={this.logout}>Logout</Button></span></li>
              <li className="options" ><p className="optionss" > </p></li>
              
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
export default homez;