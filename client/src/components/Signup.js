import React, { Component } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../store/authentication';
import { Input, Button } from '@material-ui/core';

class Signup extends Component {
  constructor(props) { super(props);
    this.state = { email: "", password: "", password2: "" };
  }

  handleSubmit = e => {
    e.preventDefault();
    let { email, password } = this.state;
    let message = !email ? "Email address is needed." :
                  !password?"Password is needed." :
                  password !== this.state.password2 ? "Passwords must match" : "";
    if (message) return this.setState({ message });
    this.setState({ message: "" }, () => this.props.signup(email, password));
  }

  updateInput = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (this.props.currentUserId) ? <Redirect to="/" /> : (
      <main className="centered middled">
        <span><NavLink className="nav" to="/login"      activeClassName="active">Login</NavLink></span>
        <form onSubmit={this.handleSubmit}>
          <Input type="text" placeholder="Email" name="email" value={this.state.email} onChange={this.updateInput} />
          <Input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.updateInput} />
          <Input type="password" placeholder="Confirm password" name="password2" value={this.state.password2} onChange={this.updateInput} />
          <Button color="primary" variant="outlined" type="submit">Signup</Button>
          <span style={{color: "red", paddingLeft:"10px"}}>{ this.state.message || this.props.message }</span>
        </form>
      </main>
    );
  }
}

const msp = state => ({ currentUserId: state.authentication.id, message: state.authentication.message});
const mdp = dispatch => ({ signup: (email, password) => dispatch(signup(email, password))})
export default connect(msp, mdp)(Signup);
