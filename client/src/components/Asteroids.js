import React from "react";
import Rock from "./Rock";
class Asteroids extends React.Component {
    constructor() {
        super();
        this.state = {
            time: 0,
            // now: 0,
            running: false,
            // start: 0,
            n_rocks: 1,
            rocks: [],
        }
        this.nx = 1380;
        this.ny = 630;
        this.width = 10;
    }

    componentDidMount() {this.setRocks()}

    newRock = z => {
        let rock = {};
        rock.xi = 0//Math.random() - 0.5;
        rock.yi = 0//Math.random() - 0.5;
        rock.zi = (z === undefined) ? Math.random() : z;
        rock.vx = 0//0.01 * (Math.random() - 0.5)
        rock.vy = 0//0.005 * (Math.random() - 0.5);
        rock.vz = 0.2 * (1 + 0.2 * (Math.random() - 0.5));
        rock.R = Math.floor(255 * Math.random());
        rock.G = Math.floor(255 * Math.random());
        rock.B = Math.floor(255 * Math.random());
        return rock;
    }

    isVisible = (X, Y, size) => (size < 0 || Math.abs(X) > 0.5 || Math.abs(Y) > 0.5);

    setRocks = z => {
        const rocks = [];
        for (let i = 0; i < this.state.n_rocks; i++) {
            rocks.push(this.newRock(z));
        }
        this.setState({rocks});
    }

    // tick = () => this.setState({ now: new Date().valueOf() });
    tick = _ => {
        let nextT = this.state.time + this.state.dt/1000;
        this.setState({time: nextT}, () => this.nextRs())
    }

    toggle = () => {
        const running = !this.state.running;
        if (running) {
          this.interval = setInterval(() => this.tick(), 100);
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
        let t = (this.state.now - this.state.start) / 1000;
        let rockComponents = this.state.rocks.map((rock, indx) => {
            let Z = rock.zi + rock.vz * t;
            let size = this.width/(1 - Z);
            let X = Math.round(this.nx * ((rock.xi + rock.vx * t)/(1 - Z) + 0.5) - size / 2);
            let Y = Math.round(this.ny * ((rock.yi + rock.vy * t)/(1 - Z) + 0.5) - size / 2);
            if (this.isVisible(X, Y, size)) {
                return <Rock
                    key={indx}
                    X={X}
                    Y={Y}
                    Z={Z}
                    color={`rgba(${rock.R}, ${rock.G}, ${rock.B}, 0.5)`}
                />
            } else {
                let nextRocks = JSON.parse(JSON.stringify(this.state.rocks));
                nextRocks[indx] = this.newRock(0);
                // this.setState({rocks: nextRocks});
            }
        })
        let { time } = this.state;
        return (
            <>
                <div>
                    <span className="button-container">
                        <button onClick={this.toggle} style={{zIndex:1000}}>
                                {this.state.running ? "Pause" : "Run"}
                        </button>
                    </span>
                    <span>time: {time} s</span>
                </div>
                <div className="rockContainer">
                {rockComponents}
                </div>
            </>
        )
    }
}

export default Asteroids;
