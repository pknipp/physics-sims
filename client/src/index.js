import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import './reset.css';
import './index.css';
//import Root from './Root';
import App from './App';
import configureStore from './store/configureStore';
require("dotenv").config();

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <Root /> */}
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
