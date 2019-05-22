import React, { Component } from 'react';
import {Button, Table} from 'react-bootstrap';
import './messages.css';

class message extends Component {

  render() {
    return (
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
            <td><Button variant="primary">Otwórz</Button></td>
            </tr>
        </tbody>
        </Table>
        </div>
      </div>
    );
  }
}


export default message;