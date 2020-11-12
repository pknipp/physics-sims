import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
//import { Button } from '@material-ui/core';
import Deck from "./Deck";

class DeckList extends React.Component {
   constructor(props) {super(props);
     this.state = {deckIds:new Set()}
   }

  // handleChangeType = e => this.setState({classType: e.target.value});
  // handleChangeSort = e => this.setState({sortType : e.target.value});
  updateDeckIds = e => {
    debugger;
    const deckId = e.target.name;
    const nextSet = this.state.deckIds;
    if (e.target.checked) {
      nextSet.add(deckId)
      debugger;
    } else {
      nextSet.delete(deckId)
      debugger;
    }
    this.setState({deckIds: nextSet}, () => console.log(this.state.deckIds))
  }

  render() {
    const props = this.props;
    let course = props.decks.course;
    delete props.decks.course;
    let decks = Object.values(props.decks);
    return (!props.user) ? <Redirect to="/login" /> : (!course) ? null : (
      <div className="deck-container">
        <div className="deck-list">
          <div>
          {/* <select onChange={this.handleChangeType} value={this.state.classType}>
            {filterOpts.map((option, i) => <option key={i} value={i}>{option}</option>)}
          </select>
          <select onChange={this.handleChangeSort} value={this.state.sortType}>
            {sortOpts.map((option, i) => <option key={i} value={i}>{option}</option>)}
          </select> */}
          </div>
          <form>
            {(!decks.length) ? <h3>There are no decks for {course.name} class.  </h3> : (
              <>
                <p align="center">Below are all of the decks for {course.name} class.  Select all desired for your study session.</p>
                {decks.map(deck => <Deck {...deck} key={deck.id} checked={this.state.deckIds.has(deck.id)} updateDeckIds={this.updateDeckIds}/>)}
                <button type="submit">Assemble selected decks.</button>
              </>
            )}
          </form>
        </div>
      </div>
    )
  }
}

const msp = state => ({user: state.authentication, decks: state.decks });
export default connect(msp)(DeckList);
