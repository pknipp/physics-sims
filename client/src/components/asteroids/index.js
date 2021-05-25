import React from "react";
import Rock from "./rock/index";
import Button from "../Button";
class Asteroids extends React.Component {
    constructor() {
        super();
        this.state = {
            time: 0,
            running: false,
            logdt: 2,
            width: 10,
            nRocks: 100,
            rocks: [],
            logSpeed: 0.2,
            info: {},
            closest: 1,
        }
        this.nx = 1380;
        this.ny = 630;
        this.info = {
            nRocks: "This is the number of asteroids which are within your field of view.  If/when an asteroid leaves your field of view, it is replaced by one in the distance.  Having too many asteroids will cause the animation to run slowly and/or choppy.",
            logdt: "This controls the amount of time between frames in the animation.  Longer timesteps make the results more choppy, especially for those asteroids which are in the distance.  Smaller timesteps may make the simulation run slowly.",
            width: "This controls the apparent size of each asteroid when it first appears in the distance. The animation is more realistic for smaller values of this parameter, because this makes the asteroid's first appearance less noticeable.  However smaller values also make it less likely that an asteroid will ever approach close enough to the viewer to become dramatically large."
        }
    }

    componentDidMount() {this.setState(
        {dt: Math.round(10 ** this.state.logdt)},
        () => this.setRocks()
    )}

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

    handleLogdt = e => {
        let logdt = Number(e.target.value);
        this.setState({ logdt, dt: Math.round(10 ** logdt)});
    }

    handleToggle = e => {
        let name = e.currentTarget.name;
        let info = this.state.info;
        info[name] = !this.state.info[name];
        this.setState({ info });
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

    isVisible = rock => (rock.z < 1 &&  Math.abs(1.6 * rock.x) < 1 - rock.z && Math.abs(0.9 * rock.y) < 1 - rock.z);

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
        let closest = this.state.closest;
        rocks.forEach((rock, i, rocks) => {
            rocks[i].x += rocks[i].vx * this.state.dt;
            rocks[i].y += rocks[i].vy * this.state.dt;
            rocks[i].z += rocks[i].vz * this.state.dt;
            rocks[i].hidden = rocks[i].hidden && !rocks[i].hidden;
            rocks[i] = (this.isVisible(rocks[i])) ? rocks[i] : this.newRock(0);
            if (rocks[i].z < 1 && 1 - rocks[i].z < closest) closest = 1 - rocks[i].z;
        })
        this.setState({ rocks, closest });
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
        let { state, handleToggle, info } = this;
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
            <div className="asteroids-container">
                <table>
                    <thead>
                        <tr><th colSpan="4"><h3>Let's fly through an asteroid field!</h3></th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td align="right">
                                <span className="ttip" data-toggle="tooltip" title={info.nRocks}>
                                    How many asteroids do you want?
                                </span>
                            </td><td></td>
                            <td align="center">
                                <input
                                    min="0" type="number" name="nRocks"
                                    onChange={this.handleInput} value={this.state.nRocks}
                                />
                                {/* <Button onClick={handleToggle} name="nRocks" toggle={state.info.nRocks}/> */}
                            </td><td></td>
                        </tr>
                        <tr>
                            <td colSpan="4">
                                <i>{state.info.nRocks ? info.nRocks : null}</i>
                            </td>
                        </tr>
                        <tr>
                            <td align="right">
                                How fast do you want to travel through the field?
                            </td>
                            <td align="right">slowly</td>
                            <td align="center">
                                <input
                                    type="range" onChange={this.handleSpeed}
                                    min="0" max="0.6" step="0.1" value={this.state.logSpeed}
                               />
                            </td>
                            <td align="left">fast</td>
                        </tr>
                        <tr>
                            <td align="right"   >
                                <span className="ttip" data-toggle="tooltip" title={info.logdt}>
                                    Timestep:
                                </span>
                            </td>
                            <td align="right">1 ms</td>
                            <td align="center">
                                <input
                                    type="range" onChange={this.handleLogdt}
                                    min="0" max="3" step="0.2" value={this.state.logdt}
                               />
                            </td>
                            <td align="left">
                                1 s
                                {/* <Button onClick={handleToggle} name="logdt" toggle={state.info.logdt}/> */}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="4">
                                <i>{state.info.logdt ? info.logdt : null}</i>
                            </td>
                        </tr>
                        <tr>
                            <td align="right">
                                <span className="ttip" data-toggle="tooltip" title={info.width}>
                                    Asteroid size (when distant):
                                </span>
                            </td>
                            <td align="right">1 px</td>
                            <td align="center">
                                <input
                                    type="range" onChange={this.handleInput2} name="width"
                                    min="1" max="10" step="0.1" value={this.state.width}
                               />

                            </td>
                            <td align="left">
                                10 px
                                {/* <Button onClick={handleToggle} name="width" toggle={state.info.width}/> */}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="4">
                                <i>{state.info.width ? info.width : null}</i>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <span className="button-container">
                        <button onClick={this.toggle} style={{zIndex:1000}}>
                                {this.state.running ? "PAUSE" : "RUN"}
                        </button>
                    </span>
                    <span>time: {time.toFixed(3)} s</span>
                </div>
                {/* <div>{this.state.closest}</div> */}
                <div
                    className="rockContainer"
                    style={{height:`${this.ny}px`, width:`${this.nx}px`}}
                >
                    {rockComponents}
                </div>
            </div>
        )
    }
}

export default Asteroids;
