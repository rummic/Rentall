import React, { Component } from 'react';
import './messages.css';
import NavbarIndex from '../Navbar/indexNav';

class message extends Component {

  render() {
    return (
      <div className="box">
        <NavbarIndex history={this.props.history} />
        <div className="box1">
          <div className="messages">
            <div className="dialogbox1">
              <p>Nick</p>
              <p>Tresc</p>
            </div>
            <div className="dialogbox2">
              <p>Nick</p>
              <p>Tresc</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default message;