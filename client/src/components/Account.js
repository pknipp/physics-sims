import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
//import { Button } from '@material-ui/core';

class Account extends Component {

  render() {
    return (!this.props.user) ? <Redirect to="/login" /> : (
      <div className="simple">
      <ul>
        <li>Email: {this.props.user.email}</li>
        <li>User since {this.props.user.createdAt}</li>
        {/* <li>{this.props.user.wantsEmail ? "Wants" : "Does not want"} to receive email</li> */}
      </ul>
      </div>
    );
  }
}

const msp = state => ({ user: state.authentication });
export default connect(msp)(Account);
