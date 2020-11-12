import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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
    this.props.login(this.state.email, this.state.password);
  }

  updateValue = name => e => this.setState({ [name]: e.target.value });

  render() {
    return (this.props.currentUserId) ? <Redirect to="/" /> : (
      <main className="centered middled">
        <form onSubmit={this.handleSubmit}>
          <Input type="text" placeholder="Email" value={this.state.email} onChange={this.updateEmail} />
          <Input type="password" placeholder="Password" value={this.state.password} onChange={this.updatePassword} />
          <Button color="primary" variant="outlined" type="submit">Login</Button>
        </form>
      </main>
    );
  }
}

const msp = state => ({ currentUserId: state.authentication.id });
const mdp = dispatch => ({ login: (email, password) => dispatch(login(email, password))})
export default connect(msp, mdp)(Login);
