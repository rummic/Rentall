import React, { Component } from 'react';
import './accsettings.css';

class accsettings extends Component {
    render() {
      return (
        <div className="App">
        <div className="main">
        lkjlkj
        </div>
        <div className="box">
          <div className="boxcontent">
            <p className="title">Ogólne ustawienia konta</p>
            <div className="userform">
              <p className="userset">Imie : </p>
                <input value="" type="text"/>
                <button type="button" >zmien imie</button>
            </div>
            <div className="userform">
              <p className="userset">Nazwisko : </p>
                <input value="" type="text"/>
                <button type="button" >zmien nazwisko</button>
            </div>
            <div className="userform">
                <p className="userset">Twój e-mail : </p>
                <input value="" type="text"/>
                <button type="button" >zmien email</button>
            </div>
            <div className="userform">
                <p className="userset">Hasło : </p>
                <input value="jlkjkl" type="password"/>
                <button type="button" >zmien hasło</button>

            </div>
          </div>
        </div>
        </div>
      );
    }
}

export default accsettings;