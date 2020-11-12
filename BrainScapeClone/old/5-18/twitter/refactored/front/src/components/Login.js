import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as authActions from '../store/authentication';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: 'DemoUser', password: 'password'};
    this.updateUsername = this.updateField('username');
    this.updatePassword = this.updateField('password');
  }

  // Not in constructor, because it needs the login method
  handleSubmit = e => {e.preventDefault();
    this.props.login(this.state.username, this.state.password);
  }

  // Why not in constructor: to avoid an infinite loop? Or is setState only used outside?
  updateField(name) {return (e) => {this.setState({ [name]: e.target.value })}}

  render() {
    if (this.props.loggedIn) return <Redirect to="/" />;
    const { username, password } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={username} onChange={this.updateUsername} />
        <input type="password" value={password} onChange={this.updatePassword} />
        <button type="submit">Log In</button>
      </form>
    )
  }
}

const msp = state => ({loggedIn: !!state.auth.id});
const mdp = dispatch => {
  // change username to email
  return {login: (username, password) => dispatch(authActions.login(username, password))};
};

export default connect(msp, mdp)(Login);
