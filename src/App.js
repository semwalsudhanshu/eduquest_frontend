
import './App.css';
import React from "react"

//import Navbar from "./Components/layout/Navbar"
import HomePage from "./Components/layout/HomePage"
import Register from "./Components/auth/Register"
import Login from "./Components/auth/Login"
import AuthenticatedRoute from "./Components/auth/AuthenticatedRoute"
import Error404 from "./Components/auth/Error404"
import Programming from "./Components/editor/Programming";
import { BrowserRouter, Route, Switch } from "react-router-dom";

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <AuthenticatedRoute exact path="/homepage" component={HomePage}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/" component={Login} />
            <AuthenticatedRoute exact path="/editor" component={Programming}/>
            <Route component={Error404} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }

}

export default App;
