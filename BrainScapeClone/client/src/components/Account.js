import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
//import { Button } from '@material-ui/core';

class Account extends Component {

  render() {
    return (!this.props.user) ? <Redirect to="/login" /> : (
      <ul>
        <li>{this.props.user.firstName} {this.props.user.lastName}</li>
        <li>User since {this.props.user.createdAt}</li>
        {(this.props.user.optStuff) ? <li>Misc personal information: {this.props.user.optStuff}</li> : null}
        <li>{this.props.user.wantsEmail ? "Wants" : "Does not want"} to receive email</li>
      </ul>
    );
  }
}

const msp = state => ({ user: state.authentication });
export default connect(msp)(Account);
