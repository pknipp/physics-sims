import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import Logout from "./components/Logout";
// import Account from "./components/Account";

class Container extends React.Component {
  componentDidMount() {this.props.fetchClasses()}
  render() {
    return (
      <BrowserRouter>
        <nav>
          <h1>Brainscape welcomes you, {" " + this.props.name}</h1>
          <div className="nav-bar">
            <span><NavLink exact to="/"       activeClassName="active">Home           </NavLink></span>
            <span><NavLink to="/account"      activeClassName="active">Account details</NavLink></span>
            <span><NavLink to="/logout"       activeClassName="active">Logout         </NavLink></span>
          </div>
        </nav>
        <Switch>
          <Route path="/logout"       component={Logout}     />
          {/* <Route path="/account"      component={Account}    /> */}
        </Switch>
      </BrowserRouter>
    )
  }
}

const msp = state => ({ name: state.authentication.firstName + " " + state.authentication.lastName });
// const mdp = dispatch=>({ fetchClasses: () => dispatch(fetchClasses())})
export default connect(msp)(Container);
