import React, { Component } from 'react';
import './alloff.css';
import { Button, Breadcrumb } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import NavbarIndex from '../Navbar/indexNav';
import swal from 'sweetalert';

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

    delete(i) {
        const token = sessionStorage.getItem("token");
        swal({
            title: "Czy na pewno chcesz usunąć ogłoszenie?",
            text: "Nie będzie możliwości jego przywrócenia!",
            icon: "warning",
            buttons: true,
            buttons: ["Anuluj", "Usuń"],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    fetch('https://localhost:44359/api/Offers/' + this.state.offerts[i].id, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            "Authorization": `bearer ${token}`
                        }
                    })
                    swal("Udało się! Twoje ogłoszenie zostało usunięte!", {
                        icon: "success",
                    }).then(val => {
                        if (val) {
                            window.location.reload();
                        }
                    });
                } else {
                    swal("Twoje ogłoszenie jest bezpieczne!");
                }
            });
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
                                        <span className="glyphicon glyphicon-trash trash" onClick={() => this.delete(i)}></span>
                                        <div className="updatbut"><Link to={{ pathname: '/update', state: item }}><button className=" glyphicon glyphicon-pencil"></button></Link></div>
                                    </div>
                                    <div className="ofprice"><NumberFormat value={item.price} displayType={'text'} thousandSeparator={' '} suffix={'zł'} /></div>
                                    <div className="ofbutton"><Link to={{ pathname: '/detailsoff/' + item.id }}><Button>Szczegóły</Button></Link></div>
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