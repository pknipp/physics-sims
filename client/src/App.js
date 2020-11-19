import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import Container from "./Container";
import Container2 from './Container2';
import { store } from './index';

const PrivateRoute = ({ component: Component, ...rest }) => {
  // console.log("rest = ", rest);
  // console.log("props = ", props);
  debugger
  return (
  <Route {...rest} render={(props) => (
    rest.needLogin === true ? <Redirect to='/login' /> : <Component {...props} />   )}    />  )}
    // rest.needLogin === true ? <Redirect to='/login' /> : <Component props={rest} />   )}    />  )}

    // Below is Aaron's way of doing it:
    // <Route path={path} exact={exact} render={props => currentUserId ? <Redirect to="/" /> : <Component />} />

class App extends React.Component {
  componentDidMount() {this.unsubscribe = store.subscribe(() => this.forceUpdate())};
  componentWillUnmount() {if (this.unsubscribe) this.unsubscribe()};

  render() {

    // console.log(this.props.needLogin);
    return (
      <BrowserRouter>
        {/* <Navbar currentUserId={this.props.currentUserId} /> */}
        <Switch>
          {/* <Route path="/login" component={Login} /> */}
          <Route path="/login" component={Container2} />
          <PrivateRoute path="/" exact={true} needLogin={this.props.needLogin} component={Container} />
          {/* <PrivateRoute path="/" exact={true} needLogin={this.props.needLogin} render={() => <Container />} /> */}
        </Switch>
      </BrowserRouter>
    );
  }
}
const msp = state => ({ currentUserId: state.authentication.id, needLogin: !state.authentication.id});
export default connect(msp)(App);
