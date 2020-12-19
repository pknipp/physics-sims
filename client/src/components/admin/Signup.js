import React, { Component } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup, editUser, resetMessage, deleteUser } from './store/authentication';
// import { Input, Button } from '@material-ui/core';

class Signup extends Component {
  constructor(props) { super(props);
    this.state = {
      email: this.props.update ? this.props.currentUserEmail : "",
      password: "",
      password2: "" };
  }

  componentDidMount() {this.props.resetMessage()};

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

  handleDelete = e => {
    e.preventDefault();
    this.props.deleteUser(this.props.currentUserId);
  }

  updateInput = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    let { state, props, updateInput, handleSubmit, handleDelete } = this;
    let { update, currentUserId } = props;
    let { email, password, password2 } = state;
    return (currentUserId && !update) ? <Redirect to="/" /> : (
      <main className="centered middled">
        {update ? null : <span><NavLink className="nav" to="/login"      activeClassName="active">Login</NavLink></span>}
        <form className="auth" onSubmit={handleSubmit}>
          <span>Email address:</span>
          <input type="text" placeholder="Email" name="email" value={email} onChange={updateInput} />
          <span>Password:</span>
          <input type="password" placeholder="" name="password" value={password} onChange={updateInput} />
          <span>Confirm password:</span>
          <input type="password" placeholder="" name="password2" value={password2} onChange={updateInput} />
          <button color="primary" variant="outlined" type="submit">{update ? "Submit changes" : "Signup"}</button>
          <span style={{color: "red", paddingLeft:"10px"}}>{ state.message || props.message }</span>
        </form>
        {!update ? null : <form className="auth" onSubmit={handleDelete}>
          <button color="primary" variant="outlined" type="submit">{"Delete account?"}</button>
        </form>}
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
  editUser:(email,password,id) => dispatch(editUser(email,password,id)),
  resetMessage: _ => dispatch(resetMessage()),
  deleteUser: id => dispatch(deleteUser(id)),
})
export default connect(msp, mdp)(Signup);
