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
import SettingsUser from "./Components/UserSettings/accsettings"
import Search from './Components/MainPage/detailsSearch';
import UpdateOffer from './Components/Offerts/updateOffer';
import Messages from './Components/Message/allMessages';
import DetailMess from './Components/Message/message';

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
      <Route path="/detailsoff/:id" component={Detailsoff}/>
      <Route path="/settings" component={SettingsUser}/>
      <Route path="/search" component={Search}/>
      <Route path="/update" component={UpdateOffer}/>
      <Route path="/messages" component={Messages}/>
      <Route path='/conversation' component={DetailMess}/>
      </div>
      </BrowserRouter>
    );
  
  }
}

export default App;
