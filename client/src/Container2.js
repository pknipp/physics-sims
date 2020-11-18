import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import Logout from "./components/Logout";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Collection from "./components/Collection";
// import Asteroids from "./components/Asteroids";
import Account from "./components/Account";

class Container2 extends React.Component {
  // componentDidMount() {this.props.fetchClasses()}
  render() {
    return (
      <BrowserRouter>
        <nav>
          <h1>{this.props.email} welcome to my physics simulations</h1>
          <div className="nav-bar">
            {/* <span><NavLink className="nav" exact to="/"       activeClassName="active">Home           </NavLink></span>
            <span><NavLink className="nav" to="/drum" activeClassName="active">Drum</NavLink></span>
            <span><NavLink className="nav" to="/asteroids" activeClassName="active">Asteroids (under construction)</NavLink></span> */}
            <span><NavLink className="nav" to="/signup"      activeClassName="active">Signup</NavLink></span>
            <span><NavLink className="nav" to="/login"       activeClassName="active">Login         </NavLink></span>
          </div>
        </nav>
        <Switch>
          <Route path="/login"       component={Login}     />
          <Route path="/signup"       component={Signup}     />
        </Switch>
      </BrowserRouter>
    )
  }
}

const msp = state => ({ email: state.authentication.email });
export default connect(msp)(Container2);
