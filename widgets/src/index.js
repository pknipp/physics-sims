import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import './index.css';
import Root from './Root';
require("dotenv").config();

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
