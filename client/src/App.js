import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './components/admin/Login';
import Signup from './components/admin/Signup';
// import Navbar from './components/Navbar';
import Container from "./components/Container";
// import { store } from './index';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    rest.needLogin === true ? <Redirect to='/login' /> : <Component {...props} />   )}
  />
)

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute path="/"
          // exact={true}
          needLogin={this.props.needLogin} component={Container} />
        </Switch>
        <span className="center">
          <br/><br/>
          <span>
            creator:
            <a href="https://pknipp.github.io/" target="_blank">Peter Knipp</a>
          </span>
        </span>
      </BrowserRouter>
    );
  }
}
const msp = state => ({ currentUserId: state.authentication.id, needLogin: !state.authentication.id});
export default connect(msp)(App);
