import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './components/Login';
import Container from "./Container";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    rest.needLogin === true ? <Redirect to='/login' /> : <Component {...props} />   )}    />  )

class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute
            path="/"
            // exact={true}
            needLogin={this.props.needLogin}
            component={Container}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}
const msp = state => ({ currentUserId: state.authentication.id, needLogin: !state.authentication.id});
export default connect(msp)(App);
