import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, NavLink, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';

import UserList from './components/UsersList';
import Login from './components/Login';
import Logout from "./components/Logout";
import Signup from "./components/Signup";
import DeleteAccount from "./components/DeleteAccount";
import { loadToken } from './actions/authentication';
debugger;

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    rest.needLogin === true
      ? <Redirect to='/login' />
      : <Component {...props} />
  )} />
)

//const App = () => {
//const App = ({ needLogin, loadToken }) => {
const App = ({ needLogin }) => {
  debugger;
  useEffect(() => {
    setLoaded(true);
    loadToken();
  }, [loadToken]);

  const [loaded, setLoaded] = useState(false);
  const authToken = Cookies.get("token");
  let currentUserIdFromToken;
  if (authToken) {
    try {
      currentUserIdFromToken = JSON.parse(atob(authToken.split(".")[1])).data.id;
    } catch (e) {
      Cookies.remove("token");
    }
  }

  const [currentUserId, setCurrentUserId] = useState(currentUserIdFromToken);
//  const [needLogin, setNeedLogin] = useState(!currentUserIdFromToken);

  const updateUser = currentUserId => {
//    setNeedLogin(false);
    setCurrentUserId(currentUserId);
  }
  return (
    <BrowserRouter>
        <nav>
            <ul>
                <li><NavLink to="/" activeClassName="active">Home</NavLink></li>
                <li><NavLink to="/login" activeClassName="active">Login</NavLink></li>
                <li><NavLink to="/signup" activeClassName="active">Signup</NavLink></li>
                <li><NavLink to="/logout" activeClassName="active">Logout</NavLink></li>
                <li><NavLink to="/delete-account" activeClassName="active">Delete Account</NavLink></li>
                <li><NavLink to="/users" activeClassName="active">Users</NavLink></li>
                <li>Hello user whose id is {currentUserId}</li>
            </ul>
        </nav>
        <Switch>
            <Route path="/users"><UserList /></Route>
            <Route path="/login"><Login updateUser={updateUser} /></Route>
            <Route path="/signup"><Signup updateUser={updateUser} /></Route>
            <Route path="/logout"><Logout /></Route>
            <Route path="/delete-account"><DeleteAccount /></Route>
            <Route path="/"><h1>My Home Page</h1></Route>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
