import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router";
import { createClassInDb } from '../store/classes';
import { Input, Button, TextareaAutosize } from '@material-ui/core';

class CreateClass extends Component {
  constructor(props) { super(props);
    this.state = { name: "", quality: "", description: "", newClass: false};
    this.updateName = this.updateValue("name");
    this.updateQuality = this.updateValue("quality");
    this.updateDescription=this.updateValue("description");
  }

  handleSubmit = e => {
    e.preventDefault();
    let nextNewClass = !this.state.newClass;
    this.setState({newClass: nextNewClass});
    this.props.createClassInDb(this.state.name, this.state.quality, this.state.description);
  }

  updateValue = name => e => this.setState({ [name]: e.target.value });

  render() {
    return (this.state.newClass) ? <Redirect to="/class-list" /> : (
      <main className="centered middled">
        <form onSubmit={this.handleSubmit}>
          <div>
            <Input type="text" placeholder="Class name" value={this.state.name} onChange={this.updateName} />
          </div>
          <div>
            <Input type="number" placeholder="Quality (on a 1 to 5 scale)" value={this.state.quality} onChange={this.updateQuality} />
          </div>
          <div>
            <TextareaAutosize placeholder="Description of class" value={this.state.description} onChange={this.updateDescription} />
          </div>
          <div>
            <Button color="primary" variant="outlined" type="submit">Submit</Button>
          </div>
        </form>
      </main>
    );
  }
}

const msp = state => ({});
const mdp = dispatch => ({ createClassInDb: (n, q, d) => dispatch(createClassInDb(n, q, d))})
export default connect(msp, mdp)(CreateClass);
