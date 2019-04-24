import React, { Component } from 'react';
import './alloff.css';
import { Button, Navbar, NavDropdown, Nav, Form, Breadcrumb } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import NumberFormat from 'react-number-format';
class alloff extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offerts: []
        }
        this.logout = this.logout.bind(this);
    }

    componentWillMount() {

        fetch('https://localhost:44359/api/Offers/User/' + sessionStorage.getItem('login'))
            .then(response => response.json())
            .then(parseJSON => {
                this.setState({
                    offerts: parseJSON.value || []
                })
            })
    }

    logout() {
        sessionStorage.clear();
        this.props.history.push("/home")
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

    }
    render() {

        if (!sessionStorage.getItem("token")) {
            return (<Redirect to={'/home'} />)
        }

        return (
            <div className="box">
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="/index">RentAll</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <NavDropdown title="Menu" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/addOffer">Dodaj oferte</NavDropdown.Item>
                                <NavDropdown.Item href="/alloff">Oferty</NavDropdown.Item>
                                <NavDropdown.Item href="#">Ustawienia</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                    <Form inline>
                        <Navbar.Text className=" mr-sm-2">
                            Zalogowany jako : <b className="login"> {sessionStorage.getItem('login')} </b>
                        </Navbar.Text>
                        <Button className="logout" variant="outline-light" size="sm" onClick={this.logout}>Logout</Button>
                    </Form>
                </Navbar>

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
                                <a className="close" onClick={() => this.delete(i)}></a>
                                <div className="offoto"><img src={"https://localhost:44359/" + item.photos[0]} alt="as" /></div>
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
                                    <div className="ofbutton"><Button href={"/detailsoff/" + i}>Szczegóły</Button></div>
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