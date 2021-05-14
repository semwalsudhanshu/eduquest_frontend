import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux'
import history from "./utils/history"
import configureStore from "./configureStore";
import { Router } from 'react-router'
import App from "./App"
//import 'bootstrap/dist/css/bootstrap.min.css'; 
//import 'fontsource-roboto';

const initialState = {};
const store = configureStore(initialState, history);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
