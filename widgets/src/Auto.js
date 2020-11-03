import React from "react";
class Autocomplete extends React.Component{
  constructor(props) { super(props);
    this.state = {inputVal: ""}
  }

  handleInput = e => this.setState({inputVal: e.target.value})

  matches = () => {
    const len = this.state.inputVal.length;
    if (!len) return this.props.names;
    const matches = this.props.names.filter(name => (name.slice(0, len).toLowerCase() === this.state.inputVal.toLowerCase()));
    return (matches.length) ? matches : ["No matches"];
  }

  handleClick = e => this.setState({inputVal: e.target.innerText});

  render() {
    return (
      <>
        <h1>Autocomplete</h1>
        <input type="text" placeholder="Write something here" onChange={this.handleInput} value={this.state.inputVal} />
        <ul onClick={this.handleClick}>
          {this.matches().map((match, i) => <li key={i}>{match}</li>)}
        </ul>
      </>
    )
  }
}

export default Autocomplete
