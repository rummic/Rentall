import React, { Component } from 'react';
import './home.css';
import logo from '../../fotos/back.jpg'
import { Button } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import NavbarMainPage from '../Navbar/mainPageNav';
import { Redirect } from 'react-router-dom';

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
                if(parseJSON.value!=null){
                    this.setState({
                        offerts: parseJSON.value || []
                    })
                    document.getElementsByClassName("offerts")[0].style.display='none';
                }else{
                  document.getElementById("emptyOffer").innerHTML = "Brak ofert";
                  document.getElementById("emptyOffer").style.display='block';
                }       
            })
        }
      }

      showOfferts(){
          if(this.state.offerts.length>0){
              return(
                this.state.offerts.map((item, i) => (
                    <div className="offerts1 searchFoto" key={i}>
                    <div className="offcon" >
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
                            <div className="ofbutton"><Button disabled href={"/search/" + item.id} search={this.state.offerts}>Szczegóły</Button></div>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                    </div>
                ))
              )
          }
      }
    render() {
        if (sessionStorage.getItem("token")) {
            return (<Redirect to={'/index'} />)
        }
      return (
          <div className="box">  
           <NavbarMainPage/>
          <div className="clearfix"></div>
            <div className="contentbox">
                <div className="description">U nas możesz wynająć nawet budę</div>
                <div className="subdescription">wyszukaj interesujących cię ofert</div>
                    <div className="searchbox arrow">
                        <input type="text" placeholder="Wyszukaj" name="search" onChange={this.onChange} />
                        <button value="wyszukaj" onClick={this.searchOffer}>Wyszukaj</button>
                    </div>
                    </div>
                    
                    <div className="emptyOffer" id="emptyOffer"></div>
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