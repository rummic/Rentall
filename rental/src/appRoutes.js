import React, { Component } from 'react';
import './App.css';
import {BrowserRouter,Route} from 'react-router-dom';

import Home from "./Components/MainPage/home";
import Login from "./Components/Login/login";
import Register from "./Components/Register/register";
import Index from "./Components/Index/homez";
import Offer from "./Components/Offerts/offerts";
import Alloff from "./Components/Offerts/alloff";
import Detailsoff from "./Components/Offerts/detailsoff";


class App extends Component {

  render() {
    return (
      <BrowserRouter>
      <div>
      <Route path="/" component={Home} exact/>
      <Route path="/home" component={Home} exact/>
      <Route path="/login" component={Login}/>
      <Route path="/register" component={Register}/>
      <Route path="/index" component={Index}/>
      <Route path="/addOffer" component={Offer}/>
      <Route path="/alloff" component={Alloff}/>
      <Route path={"/detailsoff/:id"} component={Detailsoff}/>

      </div>
      </BrowserRouter>
    );
  
  }
}

export default App;
