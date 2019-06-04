import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import NavbarIndex from '../Navbar/indexNav';
import './messages.css';

class allMessages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
        }
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
                }else{
                    document.getElementById("emptyMessage").innerHTML = responseJSON.errors;
                }
            })
    }

    person(e){
        const login = sessionStorage.getItem("login");
        if(e.senderLogin===login){
            return e.recipientLogin
        }else{
            return e.senderLogin
        }
    }

    newMessage(item){
        if(item.senderLogin !== sessionStorage.getItem("login")){
            document.getElementById("newMessage").style.background="red"
        }
    }
    render() {
        if (!sessionStorage.getItem("token")) {
            return (<Redirect to={'/home'} />)
        }
        return (
            <div className="box">
                <NavbarIndex history={this.props.history} />
                <div className="box1">
                    <div className="messages">
                        <Table responsive >
                            <thead>
                                <tr>
                                    <th>Nadawca</th>
                                    <th>Odbiorca</th>
                                    <th>Data nadania</th>
                                    <th>Akcja</th>
                                </tr>
                            </thead>
                            <tbody id="newMessage">
                                {
                                    this.state.messages.map((item, i) => (
                                        <tr key={i}>
                                            <td>{item.senderLogin}</td>
                                            <td>{item.recipientLogin}</td>
                                            <td>{item.sendDate}</td>
                                            <td><Link to={{ pathname: '/conversation/'+this.person(item)+"/"+(i+1) }}><Button variant="primary">Otwórz</Button></Link></td>
                                            {this.newMessage(item)}
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                        <div id="emptyMessage"></div>
                    </div>
                </div>
            </div>
        );
    }
}


export default allMessages;