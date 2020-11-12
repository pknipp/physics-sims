import React from 'react';
import { connect } from "react-redux";
import { Button } from '@material-ui/core';
import { toggleSubscriptionInDb } from "../store/classes";
import { fetchDecks } from "../store/decks";

class Class extends React.Component {
  constructor (props) {super(props);
    this.state = {showDetails: false}
  }

  toggleSubscription = e => {
    debugger;
    e.preventDefault();
    if (this.props.subscribed && !this.props.isPublic) alert("Because this class is private, this action will cancel both your subscription and your class");
    this.props.toggleSubscriptionInDb(this.props.id);
  }

  toggleDetails = e => {
    e.preventDefault();
    let nextDetails = !this.state.showDetails;
    this.setState({showDetails: nextDetails});
  }

  selectClass = e => {
    e.preventDefault();
    this.props.fetchDecks(this.props);
  }

  render() {
    const buttonLabel = this.props.subscribed ? "Unsubscribe" : "Subscribe"
    return (
      <li>
        <h3>
          {this.props.name}
          <Button onClick={this.toggleDetails}>
            {!(this.state.showDetails) ? "See" : "Hide"} details
          </Button>
        </h3>
        {(!this.state.showDetails) ? null : (
          <ul>
            {(this.props.description) ? <li>Description: {this.props.description}</li> : null}
            {(this.props.quality)     ? <li>Quality:     {this.props.quality}    </li> : null}
            <li> Created on {this.props.createdAt.slice(0,10)} </li>
            <li> This class is {this.props.isPublic ? "public" : "private"}.</li>
            <li>
              <Button onClick={this.toggleSubscription}>
                {buttonLabel}
              </Button>
              <Button onClick={this.selectClass}>
                Show decks
              </Button>
            </li>
          </ul>
        )}
      </li>
    )
  }
}

const msp = state => ({ currentUserId: state.authentication.id });
const mdp = dispatch => ({
  toggleSubscriptionInDb: classId => dispatch(toggleSubscriptionInDb(classId)),
  fetchDecks: classId => dispatch(fetchDecks(classId))
})
export default connect(msp, mdp)(Class);
