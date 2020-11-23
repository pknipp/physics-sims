import React from "react";
import Immutable from "immutable";
import Pixel from "./Pixels";

class DrawArea extends React.Component {
  constructor() {
    super();
    this.state = {
      lines: new Immutable.List(),
      isDrawing: false,
      isClosed: false,
    };
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mouseup", this.handleMouseUp);
  }

  componentWillUnmount() {
    document.removeEventListener("mouseup", this.handleMouseUp);
  }

  handleMouseDown(mouseEvent) {
    if (mouseEvent.button !== 0) return;
    const point = this.relativeCoordinatesForEvent(mouseEvent);
    this.setState(prevState => ({
      lines: prevState.lines.push(new Immutable.List([point])),
      isDrawing: true
    }));
  }

  handleMouseMove(mouseEvent) {
    if (!this.state.isDrawing) return;
    const point = this.relativeCoordinatesForEvent(mouseEvent);
    this.setState(prevState =>  ({
      lines: prevState.lines.updateIn([prevState.lines.size - 1], line => line.push(point))
    }));
  }

  handleMouseUp() {this.setState({ isDrawing: false })};

  relativeCoordinatesForEvent(mouseEvent) {
    const boundingRect = this.refs.drawArea.getBoundingClientRect();
    return new Immutable.Map({
      x: mouseEvent.clientX - boundingRect.left,
      y: mouseEvent.clientY - boundingRect.top,
    });
  }

  render() {
    let Pixels = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        Pixels.push(<Pixel key={8*i+j} i={i} j={j} />);
      }
    }
    return (
      <div
        className="drawArea"
        ref="drawArea"
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
      >
        <Drawing lines={this.state.lines} isDrawing={this.state.isDrawing} />
        {/* {Pixels} */}
      </div>
    );
  }
}

const orient = (p1, p2, p3) => {
  let d12 = {x: p2.x - p1.x, y: p2.y - p1.y};
  let d23 = {x: p3.x - p2.x, y: p3.y - p2.y};
  let cross = d12.x * d23.y - d12.y * d23.x;
  return (cross > 0) ? 1 : (cross < 0) ? -1 : 0;
}

function Drawing({ lines, isDrawing }) {
  return (
    <svg className="drawing">
      {lines.map((line, index) => (
        <DrawingLine key={index} line={line} isDrawing={isDrawing} />
      ))}
    </svg>
  );
}

function DrawingLine({ line, isDrawing }) {
  const pathData = "M " + line.map(p => `${p.get('x')} ${p.get('y')    }`).join(" L ");
  let pDupes = [];
  line.forEach(p => pDupes.push({x: Math.round(p.get('x')), y: Math.round(p.get('y'))}));
  let ps = pDupes.filter((p, i, ps) => {
    return (i < pDupes.length - 1 && !(p.x === pDupes[i + 1].x && p.y === pDupes[i + 1].y));
  });

  let n = ps.length;
  let iStart;
  let iEnd;
  for (let i = 2; i < n - 1; i++) {
      for (let j = 0; j < i - 1; j++) {
          if (ps[i].x === ps[j].x && ps[i].y === ps[j].y) {
              iStart = j;
              iEnd = i;
          }
          let orA = orient(ps[j], ps[j + 1], ps[i]);
          let orB = orient(ps[j], ps[j + 1], ps[i + 1]);
          let orC = orient(ps[i], ps[i + 1], ps[j]);
          let orD = orient(ps[i], ps[i + 1], ps[j + 1]);
          if (((orA * orB < 0) && (orC * orD < 0))) {
              iStart = j + 1;
              iEnd = i;
              i = j = Number.MAX_VALUE;
          }
      }
  }
  let psNew = JSON.parse(JSON.stringify(ps)).filter((p, i) => (i >= iStart && i <= iEnd));
  if (psNew.length) psNew.push(JSON.parse(JSON.stringify(psNew))[0]);
  const newPathData = "M " + psNew.map(p => `${p.x} ${p.y}`).join(" L ");
  console.log(psNew);
  return <path className="path" d={(isDrawing) ? pathData : newPathData} />
}

export default DrawArea;
