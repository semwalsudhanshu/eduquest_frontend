
import './App.css';
import React , {Component} from "react"
import {BrowserRouter as Router , Route} from "react-router-dom"

import Navbar from "./Components/layout/Navbar"
import Landing from "./Components/layout/Landing"
import Register from "./Components/auth/Register"
import Login from "./Components/auth/Login"

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar/>
      <Route exact path = "/" component = {Landing}/>
      <Route exact path = "/register" component = {Register}/>
      <Route exact path = "/login" component = {Login}/>
    </div>
    </Router>
  );
}

export default App;
