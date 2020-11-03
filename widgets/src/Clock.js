import React from "react";
class Clock extends React.Component {
  constructor() { super();
    this.state = { time: new Date() }
  }
  tick = () => this.setState({ time: new Date() });
  componentDidMount() {this.interval = setInterval(this.tick, 100)}
  componentWillUnmount() {clearInterval(this.interval)}
  render() {
    let t = this.state.time.getSeconds();
    let [x0, y0, z0] = [100, 0, 0];
    let [x1, y1, z1] = [110, 0, 10];
    let [vx0, vy0, vz0] = [0, 0, 4];
    let [vx1, vy1, vz1] = [0, 0, 2];
    let X0 = x0 + vx0 * t;
    let Y0 = y0 + vy0 * t;
    let Z0 = z0 + vz0 * t;
    let X1 = x1 + vx1 * t;
    let Y1 = y1 + vy1 * t;
    let Z1 = z1 + vz1 * t;
    let size0 = 1000/(100 - Z0);
    let size1 = 1000/(100 - Z1);
    return (
      <>
        <div>{t}</div>
        <div class="blue box" style={{
          height:`${size0}px`,
          width:`${size0}px`,
          top: `${Y0}px`,
          left: `${X0}px`,
          zIndex: `${Math.floor(Z0)}`
          }}></div>
        <div class="red box" style={{
          height:`${size1}px`,
          width:`${size1}px`,
          top: `${Y1}px`,
          left: `${X1}px`,
          zIndex: `${Math.floor(Z1)}`
          }}></div>
      </>
    )
  }
}

export default Clock;
