import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { logout } from '../store/authentication';

class Logout extends Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    return (!this.props.currentUserId) ? <Redirect to="/login" /> : (
      <main className="centered middled">
        <form onSubmit={this.handleSubmit}>
          <Button color="primary" variant="outlined" type="submit">Logout</Button>
        </form>
      </main>
    );
  }
}

const msp = state => ({ currentUserId: state.authentication.id });
const mdp = dispatch => ({ logout: () => dispatch(logout())})
export default connect(msp, mdp)(Logout);
