import React, { Component } from 'react';
import './home.css';
import logo from '../fotos/back.jpg'
import { Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class homez extends Component {

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
            return (<Redirect to={'/home'} />)
        }
        return (
            <div className="box">
                <div className="navBar">
                    <div className="navBarCon">
                        <ul>
                            <li className="logo"><a>RentAll</a></li>
                            <li><a>Witaj,<b> {sessionStorage.getItem('login')}!</b></a></li>
                            <li className="options"><span className="menu"><Button className="logout" variant="info" onClick={this.logout}>Logout</Button></span></li>
                            <li className="options" ><Link to="/addOffer">Dodaj oferte</Link><p className="optionss" > </p></li>

                        </ul>
                    </div>
                </div>
                <div className="clearfix"></div>
                
                <div className="offerts">
                    <p className="random">Twoje oferty</p>

                    {
                        this.state.offerts.map((item,i) => (
                            <div className="offert" key={i}>
                                <div className="ofer" >
                                <img src="https://uwolnijnauke.pl/wp-content/uploads/sites/13/2014/02/chomik-200x200.png" alt="as" />
                                {item.title}</div>
                                <button>Szczegóły</button>
                            </div>
                        ))

                    }




                </div>
            </div >

        );
    }
}
export default homez;