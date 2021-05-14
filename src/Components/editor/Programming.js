import React, { Component } from "react";
import Navbar from "../layout/Navbar";
import MyForm from './MyForm';


class Programming extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
      }
    };
  
 
  
  render() {
    
    return (
        <React.Fragment>
          <Navbar/>
          <MyForm/>
        </React.Fragment>
    );
  }

}

export default (Programming);
