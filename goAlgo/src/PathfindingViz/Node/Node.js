import React from 'react';
import './Node.css'
export default class Node extends React.Component {
  constructor(props) {
    super(props);
    this.children = [];
  }

  addChild(name) {
    this.children.push(new Node(name));
    return this;
  }

  render() {
    const {
      isFinish,
      isStart,
      isVisited,
      location,
      col,
      row,
      onMouseDown,
      onMouseEnter,
      onMouseUp
    } = this.props;
    const extraClassName =
      isFinish
        ? 'node-finish'
        : isStart
          ? 'node-start'
          : isVisited
            ? 'node-visited'
            : '';
    return (
      <div className={`node ${extraClassName}`}
        id={`loc-${location}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
      >
        <div className='inner-node'></div>
      </div>
    )
  }
}
