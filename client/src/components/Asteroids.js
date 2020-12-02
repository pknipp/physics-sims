import React from "react";
import Rock from "./Rock";
class Asteroids extends React.Component {
    constructor() {
        super();
        this.state = {
            time: 0,
            running: false,
            logDt: 2,
            width: 10,
            nRocks: "",
            rocks: [],
            logSpeed: 0.2,
        }
        this.nx = 1380;
        this.ny = 630;
    }

    componentDidMount() {this.setState({dt: Math.round(10 ** this.state.logDt)})
        //this.setRocks(this.state.nRocks)
    }

    handleInput = e => {
        let newState = {};
        let targ = e.target;
        newState[targ.name] = Number(targ.value);
        this.setState(newState, () => this.setRocks());
    }

    handleInput2 = e => {
        let newState = {};
        newState[e.target.name] = Number(e.target.value);
        this.setState(newState);
    }

    handleLogDt = e => {
        let logDt = Number(e.target.value);
        this.setState({ logDt, dt: Math.round(10 ** logDt)});
    }

    handleSpeed = e => this.setState({logSpeed: e.target.value});

    newRock = z => {
        let speed = 10 ** (2 * this.state.logSpeed - 1)
        let maxPix = Math.max(this.nx, this.ny);
        let rock = {};
        rock.x = Math.random() - 0.5;
        rock.y = Math.random() - 0.5;
        rock.z = (z === undefined) ? Math.random() : z;
        rock.vx = speed * (Math.random() - 0.5)/maxPix;
        rock.vy = speed * (Math.random() - 0.5)/maxPix;
        rock.vz = (speed + Math.random())/maxPix;
        rock.R = Math.floor(255 * Math.random());
        rock.G = Math.floor(255 * Math.random());
        rock.B = Math.floor(255 * Math.random());
        rock.hidden = true;
        return rock;
    }

    isVisible = rock => (rock.z < 1 &&  Math.abs(1.6 * rock.x) < 1 - rock.z && Math.abs(1.6 * rock.y) < 1 - rock.z);

    setRocks = _ => {
        const rocks = [];
        for (let i = 0; i < this.state.nRocks; i++) {
            rocks.push(this.newRock());
        }
        this.setState({rocks});
    }

    // tick = () => this.setState({ now: new Date().valueOf() });
    tick = _ => {
        let nextT = this.state.time + this.state.dt/1000;
        this.setState({time: nextT}, () => this.propagate())
    }

    propagate = _ => {
        let rocks = JSON.parse(JSON.stringify(this.state.rocks));
        rocks.forEach((rock, i, rocks) => {
            rocks[i].x += rocks[i].vx * this.state.dt;
            rocks[i].y += rocks[i].vy * this.state.dt;
            rocks[i].z += rocks[i].vz * this.state.dt;
            rocks[i].hidden = rocks[i].hidden && !rocks[i].hidden;
            rocks[i] = (this.isVisible(rocks[i])) ? rocks[i] : this.newRock(0);
        })
        this.setState({ rocks });
    }

    toggle = () => {
        const running = !this.state.running;
        if (running) {
          this.interval = setInterval(() => this.tick(), this.state.dt);
          this.setState({start: new Date().valueOf()});
        } else {
          clearInterval(this.interval);
          this.interval = null;
        }
        this.setState({ running });
    };

    // componentDidMount() {this.interval = setInterval(this.tick, 10)}
    // componentWillUnmount() {clearInterval(this.interval)}

    render() {
        let rockComponents = this.state.rocks.map((rock, indx) => {
            let z = rock.z;
            // The 2nd term in the expression below is unphysical but seems to succeed, psychovisually
            let size = this.state.width * (1 / (1 - z) - 1 / (1 + z));
            let xpx = Math.round(this.nx * (rock.x/(1 - z) + 0.5) - size / 2);
            let ypx = Math.round(this.ny * (rock.y/(1 - z) + 0.5) - size / 2);
            return rock.hidden ? null : <Rock
                key={indx}
                x={xpx}
                y={ypx}
                z={z}
                color={`rgba(${rock.R}, ${rock.G}, ${rock.B}, 1)`}
                size={size}
                dt={this.state.dt}
            />
        })
        let { time } = this.state;
        return (
            <>
                <table>
                    <thead>
                        <tr><th colSpan="4">Let's fly through an asteroid field!</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="2" align="right">How many asteroids do you want?</td>
                            <td colSpan="2">
                                <input
                                    min="0" type="number" name="nRocks"
                                    onChange={this.handleInput} value={this.state.nRocks}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>How fast do you want to travel through the field?</td>
                            <td>slowly</td>
                            <td>
                                <input
                                    type="range" onChange={this.handleSpeed}
                                    min="0" max="0.6" step="0.1" value={this.state.logSpeed}
                               />
                            </td>
                            <td>fast</td>
                        </tr>
                        <tr>
                            <td align="right"   >Timestep:</td>
                            <td>1 ms</td>
                            <td>
                                <input
                                    type="range" onChange={this.handleLogDt}
                                    min="0" max="3" step="0.2" value={this.state.logDt}
                               />
                            </td>
                            <td>1 s</td>
                        </tr>
                        <tr>
                            <td align="right">Asteroid size (when distant):</td>
                            <td>1 px</td>
                            <td>
                                <input
                                    type="range" onChange={this.handleInput2} name="width"
                                    min="1" max="10" step="0.1" value={this.state.width}
                               />
                            </td>
                            <td>10 px</td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <span className="button-container">
                        <button onClick={this.toggle} style={{zIndex:1000}}>
                                {this.state.running ? "Pause" : "Run"}
                        </button>
                    </span>
                    <span>time: {Math.round(1000*time)/1000} s</span>
                </div>
                <div className="rockContainer">
                {rockComponents}
                </div>
            </>
        )
    }
}

export default Asteroids;
