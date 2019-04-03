import React, { Component } from 'react';
import './App.css';
import {BrowserRouter,Route} from 'react-router-dom';

import Home from "./Components/home";
import Login from "./Components/login";
import Register from "./Components/register";
import Index from "./Components/homez";


class App extends Component {

  render() {
    return (
      <BrowserRouter>
      <div>
      <Route path="/" component={Home} exact/>
      <Route path="/login" component={Login}/>
      <Route path="/register" component={Register}/>
      <Route path="/index" component={Index}/>
      </div>
      </BrowserRouter>
    );
  
  }
}

export default App;