import React, { Component } from 'react';
import '../MainPage/home.css';
import { Redirect } from 'react-router-dom';
import NavbarIndex from '../Navbar/indexNav';
import Page from '../Helpers/page';

class homez extends Component {

    render() {
        if (!sessionStorage.getItem("token")) {
            return (<Redirect to={'/home'} />)
        }
        return (
            <div className="box">
                <NavbarIndex history={this.props.history}/>
                <Page/>
            </div >

        );
    }
}
export default homez;