import React, { Component } from 'react';
import './home.css';
import NavbarMainPage from '../Navbar/mainPageNav';
import { Redirect } from 'react-router-dom';
import Page from '../Helpers/page';

class home extends Component {


    render() {
        if (sessionStorage.getItem("token")) {
            return (<Redirect to={'/index'} />)
        }

        return (
            <div className="box">
                <NavbarMainPage />
                <Page/>
            </div>
        );
    }
}
export default home;