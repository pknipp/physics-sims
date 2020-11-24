import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import Logout from "./components/Logout";
import Collection from "./components/Collection";
import Asteroids from "./components/Asteroids";
import Account from "./components/Account";
import { store } from "./index";

class Container extends React.Component {
  componentDidMount() {this.unsubscribe = store.subscribe(() => this.forceUpdate())};
  componentWillUnmount() {if (this.unsubscribe) this.unsubscribe()};
  
  render() {
    return (
      <BrowserRouter>
        <nav>
          <h1>{this.props.email} welcome to my physics simulations</h1>
          <div className="nav-bar">
            <span><NavLink className="nav" exact to="/"       activeClassName="active">Home           </NavLink></span>
            <span><NavLink className="nav" to="/drum" activeClassName="active">Drumhead</NavLink></span>
            <span><NavLink className="nav" to="/asteroids" activeClassName="active">Asteroid field</NavLink></span>
            <span><NavLink className="nav" to="/account"      activeClassName="active">Account details</NavLink></span>
            <span><NavLink className="nav" to="/logout"       activeClassName="active">Logout         </NavLink></span>
          </div>
        </nav>
        <Switch>
          <Route path="/logout"       component={Logout}     />
          <Route path="/drum"       component={Collection}     />
            <Route path="/asteroids" component={Asteroids} />
          <Route path="/account"      component={Account}    />
        </Switch>
      </BrowserRouter>
    )
  }
}

const msp = state => ({ email: state.authentication.email, currentUserId: state.authentication.id, needLogin: !state.authentication.id});
// const mdp = dispatch=>({ fetchClasses: () => dispatch(fetchClasses())})
export default connect(msp)(Container);
