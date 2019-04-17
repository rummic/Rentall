import React, { Component } from 'react';
import './alloff.css';
import logo from '../fotos/back.jpg'
import { Button } from 'react-bootstrap';
import { Link,Redirect } from 'react-router-dom';

class alloff extends Component {
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

    render() {
        if (this.state.redirect) {
            return (<Redirect to={'/index'} />)
          }
          if(!sessionStorage.getItem("value")){
            return(<Redirect to={'/index'}/>) 
          }
        return (
            <div className="box">
                <div className="navBar">
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
                </div>
                <div className="clearfix"></div>
                <div className="ofbox">

                    {
                        this.state.offerts.map((item, i) => (
                            <div className="offcon" key={i}>
                                <div className="offoto"><img src={"https://localhost:44359/" + item.photos} alt="as" /></div>
                                <div className="ofdesc"> {item.title}
                                    <div className="ofprice"> {item.price}
                                    </div>
                                </div>
                                <div className="ofbutton"><button><Link to={"/detailsoff/"+i}>Details</Link></button></div>
                                <div className="clearfix"></div>
                            </div>
                        ))

                    }

                </div>
            </div>
        );
    }
}
export default alloff;