import React, { useState  } from "react";
import { useDispatch, useSelector } from "react-redux";
import {login} from "../store/auth";
import { Redirect } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userId = useSelector(state => state.auth.id);
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(login(email, password));
  }

  if (userId) return <Redirect to="/" />;

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email
        <input type="email"    name="email"     value={email}   onChange={e => setEmail(e.target.value)} />
      </label>
      <label>
        Password
        <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <button type="submit" onSubmit={handleSubmit}>Log In</button>
    </form>
  )
}

export default LoginPage;

// import React from 'react';
// import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
// import * as authActions from '../store/authentication';

// class Login extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {username: 'DemoUser', password: 'password'};
//     this.updateUsername = this.updateField('username');
//     this.updatePassword = this.updateField('password');
//   }

//   // Not in constructor, because it needs the login method
//   handleSubmit = e => {e.preventDefault();
//     this.props.login(this.state.username, this.state.password);
//   }

//   // Why not in constructor: to avoid an infinite loop? Or is setState only used outside?
//   updateField(name) {return (e) => {this.setState({ [name]: e.target.value })}}

//   render() {
//     if (this.props.loggedIn) return <Redirect to="/" />;
//     const { username, password } = this.state;
//     return (



//     )
//   }
// }
