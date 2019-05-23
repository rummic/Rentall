import React, { Component } from 'react';
import './alloff.css';
import { Button, Breadcrumb } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import NavbarIndex from '../Navbar/indexNav';

class alloff extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offerts: [],
        }

    }

 
    componentWillMount() {
        fetch('https://localhost:44359/api/Offers/User/' + sessionStorage.getItem('login'))
            .then(response => response.json())
            .then(responseJSON => {
                if (responseJSON.hasErrors) {
                    document.getElementById("empyOffer").innerHTML = responseJSON.errors;
                } else {
                    this.setState({
                        offerts: responseJSON.value || []
                    })
                }
            })
    }

    componentDidUpdate() {
        if (this.state.offerts.length === 0) {
            document.getElementById("empyOffer").innerHTML = "Brak ofert";
        }
    }
    delete(i) {
        const token = sessionStorage.getItem("token");
        fetch('https://localhost:44359/api/Offers/' + this.state.offerts[i].id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `bearer ${token}`
            }
        })
            .then(parseJSON => {
                console.log(parseJSON);
            })
        this.setState({ show: false });
        window.location.reload();
    }
    render() {
        if (!sessionStorage.getItem("token")) {
            return (<Redirect to={'/home'} />)
        }
        return (
            <div className="box">
                <NavbarIndex history={this.props.history} />
                <div className="clearfix"></div>
                <div className="ofbox">
                    <Breadcrumb>
                        <Breadcrumb.Item href="/index">RentAll</Breadcrumb.Item>
                        <Breadcrumb.Item active>Oferty</Breadcrumb.Item>
                    </Breadcrumb>
                    <div id="empyOffer"></div>
                    {
                        this.state.offerts.map((item, i) => (
                            <div className="offcon" key={i}>
                                <div className="offoto"><img src={(item.photos[0] === undefined ? 'https://screenshotlayer.com/images/assets/placeholder.png' : "https://localhost:44359/" + item.photos[0])} alt="as" /></div>
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
                                <div className="offdel">
                                    <a className="close" onClick={() => this.delete(i)}></a>
                                    <span className="glyphicon glyphicon-trash trash" onClick={() => this.delete(i)}></span>
                                </div>
                                    <div className="ofprice"><NumberFormat value={item.price} displayType={'text'} thousandSeparator={' '} suffix={'zł'} /></div>
                                    <div className="ofbutton"><Link to={{ pathname: '/detailsoff/'+item.id}}><Button>Szczegóły</Button></Link></div>
                                    <div className="updatbut"><Link to={{ pathname: '/update', state: item }}><Button>Aktualizuj</Button></Link></div>
                                </div>
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