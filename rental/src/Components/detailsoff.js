import React, { Component } from 'react';
import './detailsoff.css';
import logo from '../fotos/back.jpg'
import { Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';

class detailsoff extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      login: "",
      offerts: []

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
          offerts: parseJSON.value
        })
      })


  }

  logout() {
    sessionStorage.setItem("value", '');
    sessionStorage.clear();
    this.setState({ redirect: true });
  }

wyswietlanie(){
  const obj = this.state.offerts[this.props.match.params.id];
  const path = "https://localhost:44359/"
  if(obj!=null){
    document.getElementsByClassName("offertitle")[0].innerHTML = obj.title;
    document.getElementById("foto").src= path+obj.photos[0];
    document.getElementsByClassName("offerprice")[0].innerHTML = obj.price;
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
        <p>User offer id : {this.props.match.params.id}</p>
{
   this.wyswietlanie()
}
        <div className="navBar">
          <div className="navBarCon">
            <ul>
              <li className="logo"><Link to="/index">RentAll</Link></li>
              <li><Link to="/alloff">Oferty</Link></li>
              <li><a>Witaj,<b> {sessionStorage.getItem('login')}!</b></a></li>
              <li className="options"><span className="menu"><Button className="logout" variant="info" onClick={this.logout}>Logout</Button></span></li>
              <li className="options" ><Link to="/addOffer">Dodaj oferte</Link><p className="optionss" > </p></li>

            </ul>
          </div>
        </div>
        <div className="clearfix"></div>
        <div className="offertbox">
          <div className="offerttop">
            <div className="offertitle">Tytuł wpisany w formularzu</div>
            <div className="offerfoto"> <img id="foto" src="" alt="ss"/></div>
            <div className="offerdesc">
              <div className="offerprice">Cena</div>
              <button >Wynajmij</button>
            </div>
            <div className="clearfix"></div>
          </div>
          <div className="offerdet">
            <p>Opis wszystkiego</p>
            <img src={logo} alt="sss" />
          </div>
          <div className="clearfix"></div>
        </div>
      </div>
    );
  }
}
export default detailsoff;