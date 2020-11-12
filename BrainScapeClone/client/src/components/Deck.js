import React from 'react';
import { connect } from "react-redux";
//import { Button } from '@material-ui/core';

class Deck extends React.Component {
  constructor(props) {super(props);
    this.state={wantsDeck: false}
  }

  // toggleSubscription = e => {
  //   e.preventDefault();
  //   this.props.toggleSubscriptionInDb(this.props.id);
  // }

  // toggleDetails = e => {
  //   e.preventDefault();
  //   let nextDetails = !this.state.showDetails;
  //   this.setState({showDetails: nextDetails});
  // }

  // selectClassId = e => {
  //   debugger;
  //   e.preventDefault();
  //   this.props.fetchDecks(this.props.id);
  // }

  render() {
    debugger;
    return (
      <div>
        <input type="checkbox" checked={this.props.checked} name={this.props.id} onChange={this.props.updateDeckIds} />
          <label htmlFor={Deck.id}> deck name: {this.props.name[0].toUpperCase() + this.props.name.slice(1)}
            <div>
              Objective: {this.props.objective}
            </div>
            <div>&nbsp;</div>
          </label>
      </div>
    )
  }
}

const msp = state => ({ currentUserId: state.authentication.id });
export default connect(msp)(Deck);
