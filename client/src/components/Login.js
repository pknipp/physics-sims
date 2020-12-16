import React, { Component } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../store/authentication';
import { Input, Button } from '@material-ui/core';

class Login extends Component {
  constructor(props) { super(props);
    this.state = { email: "demo@aol.com", password: "password" };
    this.updateEmail = this.updateValue("email");
    this.updatePassword = this.updateValue("password");
  }

  handleSubmit = e => {
    e.preventDefault();
    let { email, password } = this.state;
    let message = !email ? "Email address is needed." : !password ? "Password is needed." : "";
    if (message) return this.setState({ message });
    this.setState({ message: "" }, () => this.props.login(email, password));
  }

  updateValue = name => e => this.setState({ [name]: e.target.value });

  render() {
    // console.log("Loginform says that message = ", typeof(this.props.message));
    return (this.props.currentUserId) ? <Redirect to="/" /> : (
      <main className="centered middled">
         <span><NavLink className="nav" to="/signup"      activeClassName="active">Signup</NavLink></span>
        <form onSubmit={this.handleSubmit}>
          <Input type="text" placeholder="Email" value={this.state.email} onChange={this.updateEmail} />
          <Input type="password" placeholder="Password" value={this.state.password} onChange={this.updatePassword} />
          <Button color="primary" variant="outlined" type="submit">Login</Button>
          <span style={{color:"red", paddingLeft:"10px"}}>{this.state.message || this.props.message}</span>
        </form>
      </main>
    );
  }
}

const msp = state => ({ currentUserId: state.authentication.id, message: state.authentication.message });
const mdp = dispatch => ({ login: (email, password) => dispatch(login(email, password))})
export default connect(msp, mdp)(Login);
