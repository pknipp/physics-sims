import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import './reset.css';
import './index.css';
//import Root from './Root';
import App from './App';
// import DrawArea from './components/DrawArea';
import configureStore from './store/configureStore';
require("dotenv").config();

export const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <Root /> */}
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
// ReactDOM.render(<DrawArea />, document.getElementById("container"));
