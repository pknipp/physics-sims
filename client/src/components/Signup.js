import React, { Component } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup, editUser } from '../store/authentication';
import { Input, Button } from '@material-ui/core';

class Signup extends Component {
  constructor(props) { super(props);
    this.state = {
      email: this.props.update ? this.props.currentUserEmail : "",
      password: "",
      password2: "" };
  }

  handleSubmit = e => {
    e.preventDefault();
    let { email, password } = this.state;
    let message = !email ? "Email address is needed." :
                  !password?"Password is needed." :
                  password !== this.state.password2 ? "Passwords must match" : "";
    if (message) return this.setState({ message });
    this.setState({ message: "" }, () => {
      this.props.update ? this.props.editUser(email, password, this.props.currentUserId) : this.props.signup(email, password)})
  }

  updateInput = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    let { state, props, updateInput, handleSubmit } = this;
    let { update, currentUserId } = props;
    let { email, password, password2 } = state;
    return (currentUserId && !update) ? <Redirect to="/" /> : (
      <main className="centered middled">
        {update ? null : <span><NavLink className="nav" to="/login"      activeClassName="active">Login</NavLink></span>}
        <form onSubmit={handleSubmit}>
          <Input type="text" placeholder="Email" name="email" value={email} onChange={updateInput} />
          <Input type="password" placeholder="Password" name="password" value={password} onChange={updateInput} />
          <Input type="password" placeholder="Confirm password" name="password2" value={password2} onChange={updateInput} />
          <Button color="primary" variant="outlined" type="submit">{update ? "Submit changes" : "Signup"}</Button>
          <span style={{color: "red", paddingLeft:"10px"}}>{ state.message || props.message }</span>
        </form>
      </main>
    );
  }
}

const msp = state => ({
  currentUserId: state.authentication.id,
  currentUserEmail: state.authentication.email,
  message: state.authentication.message
});
const mdp = dispatch => ({
  signup: (email, password) => dispatch(signup(email, password)),
  editUser:(email,password,id) => dispatch(editUser(email,password,id))
})
export default connect(msp, mdp)(Signup);
