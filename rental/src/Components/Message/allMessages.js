import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import NavbarIndex from '../Navbar/indexNav';
import './messages.css';

class allMessages extends Component {

    render() {
        if (!sessionStorage.getItem("token")) {
            return (<Redirect to={'/home'} />)
        }
        return (
            <div className="box">
                <NavbarIndex history={this.props.history} />
                <div className="box1">
                    <div className="messages">
                        <Table responsive>
                            <thead>
                                <tr>

                                    <th>Nadawca</th>
                                    <th>Data nadania</th>
                                    <th>Akcja</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>

                                    <td>ktostam</td>
                                    <td>090-9</td>
                                    <td><Link to={{ pathname: '/conversation' }}><Button variant="primary">Otwórz</Button></Link></td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }
}


export default allMessages;