import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
//import { Button } from '@material-ui/core';

class Account extends Component {

  render() {
    console.log(typeof(this.props.user.createdAt))
    let date = this.props.user.createdAt.split("T")[0].split("-");
  //  let year = date.getFullYear();
    // let month = date.getMonth() + 1;
    // let dateOfMonth = date.getDate();
    // let prettyDate = `${month}/${dateOfMonth}`;
    return (!this.props.user) ? <Redirect to="/login" /> : (
      <div className="simple">
      <ul>
        <li>email: {this.props.user.email}</li>
        <li>user since {`${date[1]}/${date[2]}/${date[0]}`}</li>
        {/* <li>{this.props.user.wantsEmail ? "Wants" : "Does not want"} to receive email</li> */}
      </ul>
      </div>
    );
  }
}

const msp = state => ({ user: state.authentication });
export default connect(msp)(Account);
