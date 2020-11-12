import React from 'react';
import { connect } from "react-redux";
class Success extends React.Component {
  render() {
    return <h1>{this.props.currentUserId} is Logged in!</h1>
  }
}
const msp = state => ({ currentUserId: state.authentication.id, needLogin: !state.authentication.id});
export default connect(msp)(Success);
//export default Success;
