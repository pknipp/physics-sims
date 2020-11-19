import React from "react";
import Rock from "./Rock";
class Asteroids extends React.Component {
    constructor() {
        super();
        this.state = {
            now: 0,
            running: false,
            start: 0,
            n_rocks: 500,
            rocks: [],
        }
    }

    componentDidMount() {this.setRocks()}

    setRocks = () => {
        const rocks = [];
        for (let i = 0; i < this.state.n_rocks; i++) {
            let rock = {};
            rock.xi = Math.random() - 0.5;
            rock.yi = Math.random() - 0.5;
            rock.zi = Math.random();
            rock.vx = 0.01 * (Math.random() - 0.5)
            rock.vy = 0.005 * (Math.random() - 0.5);
            rock.vz = 0.02 * (1 + 0.2 * (Math.random() - 0.5));
            rock.R = Math.floor(255 * Math.random());
            rock.G = Math.floor(255 * Math.random());
            rock.B = Math.floor(255 * Math.random());
            rocks.push(rock);
            this.setState({rocks});
        }

    }

    tick = () => this.setState({ now: new Date().valueOf() });

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
            let X = (rock.xi + rock.vx * t)/(1 - Z);
            let Y = (rock.yi + rock.vy * t)/(1 - Z);
            return <Rock
                key={indx}
                X={X}
                Y={Y}
                Z={Z}
                color={`rgba(${rock.R}, ${rock.G}, ${rock.B}, 0.5)`}
            />
        })
        return (
            <>
                <div>
                    <span className="button-container">
                        <button onClick={this.toggle} style={{zIndex:1000}}>
                                {this.state.running ? "Pause" : "Run"}
                        </button>
                    </span>
                    <span>time: {t} s</span>
                </div>
                <div className="rockContainer">
                {rockComponents}
                </div>
            </>
        )
    }
}

export default Asteroids;
