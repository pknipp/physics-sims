import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
//import { Button } from '@material-ui/core';
import Class from "./Class";
import DeckList from "./DeckList";

class ClassList extends React.Component {
  constructor(props) {super(props);
    this.state = {classType: 0, sortType: 4, classId: 0}
  }

  handleChangeType = e => this.setState({classType: e.target.value});
  handleChangeSort = e => this.setState({sortType : e.target.value});

  render() {
    const props = this.props;
    //map "classes" slice of state from an object to an array, to allow filtering & sorting
    let classes = Object.keys(props.classes).map(classId => props.classes[classId]);
    const filterOpts = ['"read" access', 'complete access', 'subscribed', 'not subscribed'];
    const sortOpts = [
      "alphabetically.",
      "highest quality first.",
      "lowest quality first.",
      "earliest first.",
      "latest first."];
    const sortFns = [
      (a, b) => {
        const aLC = a.name.toLowerCase();
        const bLC = b.name.toLowerCase();
        return (aLC < bLC) ? -1 : (aLC > bLC) ? 1 : 0;
      },
      (a, b) => b.quality - a.quality,
      (a, b) => a.quality - b.quality,
      (a, b) => {
        const aD = a.createdAt;
        const bD = b.createdAt;
        return (aD < bD) ? -1 : (aD > bD) ? 1 : 0
      },
      (a, b) => {
        const aD = a.createdAt;
        const bD = b.createdAt;
        return (aD < bD) ? 1 : (aD > bD) ? -1 : 0
      }
    ]
    classes = classes.filter(course => {
      return [
        course.subscribed || course.isPublic,
        course.subscribed && !course.isPublic,
        course.subscribed,
        !course.subscribed && course.isPublic
      ][this.state.classType];
    });
    classes.sort(sortFns[this.state.sortType]);
    return (!props.user) ? <Redirect to="/login" /> : (
      <div className="container">
        {/* event listener below did not seem to catch any bubbles */}
        <div className="class-list" onClick={this.handleDecks}>
          <div>
          <span> View all classes to which you have </span>
          <select onChange={this.handleChangeType} value={this.state.classType}>
            {filterOpts.map((option, i) => <option key={i} value={i}>{option}</option>)}
          </select>
          <select onChange={this.handleChangeSort} value={this.state.sortType}>
            {sortOpts.map((option, i) => <option key={i} value={i}>{option}</option>)}
          </select>
          </div>
          {(!classes.length) ? <h3>There are no classes in this category  </h3> : (
            <ul>
              {classes.map(course => <Class {...course} key={course.id} />)}
            </ul>
          )}
        </div>
        <DeckList />
      </div>
    )
  }
}

const msp = state => ({ user: state.authentication, classes: state.classes });
export default connect(msp)(ClassList);
