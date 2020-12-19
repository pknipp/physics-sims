import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
//import { Button } from '@material-ui/core';

class Account extends Component {

  render() {
    let date = this.props.user.createdAt.split("T")[0].split("-");
    return (!this.props.user) ? <Redirect to="/login" /> : (
      <div className="simple">
      <ul>
        <li>email: {this.props.user.email}</li>
        <li>user since {`${date[1]}/${date[2]}/${date[0]}`}</li>
      </ul>
      </div>
    );
  }
}

const msp = state => ({ user: state.authentication });
export default connect(msp)(Account);
