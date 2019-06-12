import React, { Component } from 'react';
import { Button, Navbar, NavDropdown, Nav, Form, Badge} from 'react-bootstrap';

class NavbarIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
        }
        this.logout = this.logout.bind(this);
    }
    logout() {
        sessionStorage.clear();    
        this.props.history.push("/home")
    }

    componentWillMount() {
        const token = sessionStorage.getItem("token");
        fetch('https://localhost:44359/api/Messages', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(responseJSON => {
                if (!responseJSON.hasErrors) {
                    this.setState({
                        messages: responseJSON.value || []
                    })
                    for(let i = 0;i<this.state.messages.length;i++){
                        if(this.state.messages[i].senderLogin !== sessionStorage.getItem("login")){
                            document.getElementById("newMessage").innerHTML = "1";
                            document.getElementById("newMessage").style.color = "red"
                            document.getElementById("newMessageInfo").innerHTML = '<span class="glyphicon glyphicon-envelope" style="color: red"></span><a href="/messages">  Nowa wiadomość</a>'
                           let c = document.getElementById("newMessageInfo");
                           c.getElementsByTagName("a")[0].style.color = "red"
                        }else{
                            
                        }
                    }
                }
            })
    }

    render(){
      return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
                    <Navbar.Brand href="/index">RentAll</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto" >
                    <Button className="addOffer" variant="outline-light" size="sm" href="/addOffer" >Dodaj oferte</Button>
                    </Nav>
                    <div id="newMessageInfo" style ={{ float: "left" ,marginRight: "20px" }}> </div>
                    <Navbar.Text className=" mr-sm-2">
                            Zalogowany jako : 
                        </Navbar.Text>
                    <Form inline>
                        <Nav className="mr-auto">
                            <NavDropdown title={sessionStorage.getItem('login')} id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/alloff"><span className="glyphicon glyphicon-picture"></span> Oferty</NavDropdown.Item>
                                <NavDropdown.Item href="/messages" ><span className="glyphicon glyphicon-envelope"></span> Wiadomosci<Badge variant="light" id="newMessage"></Badge></NavDropdown.Item>
                                <NavDropdown.Item href="/settings"><span className="glyphicon glyphicon-wrench"></span> Ustawienia</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item className="logout" onClick={this.logout} ><span className="glyphicon glyphicon-log-in"></span> Wyloguj</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Form>
                    </Navbar.Collapse>
                </Navbar>
      )
    }
  }

  export default NavbarIndex;