import React from "react";
import Rock from "./Rock";
class Collection extends React.Component {
    constructor() {
        super();
        this.state = {
            now: 0,
            running: false,
            start: 0,
        }
    }

    tick = () => this.setState({ now: new Date().valueOf() });

    toggle = () => {
        const running = !this.state.running;
        if (running) {
          this.interval = setInterval(() => this.tick(), 100);
          this.setState({start: new Date().valueOf()});
        } else {
            console.log("This should log after the stop button is pushed.")
          clearInterval(this.interval);
          this.interval = null;
        }
        this.setState({ running });
      };

    // componentDidMount() {this.interval = setInterval(this.tick, 10)}

    // componentWillUnmount() {clearInterval(this.interval)}

    render() {
        let t = (this.state.now - this.state.start) / 1000;
        return (
            <>
                <div>
                    <p>time: {t} s</p>
                    <button onClick={this.toggle}>
                        {this.state.running ? "Stop" : "Start"}
                    </button>
                </div>
                <div>{this.props.rocks.map((rock, indx) => (
                    // let Z = rock.zi + rock.vz * t;
                    // let X = (rock.xi + rock.vx * t)/(1 - (rock.zi + rock.vz * t));
                    // let Y = (rock.yi + rock.vy * t)/(1 - (rock.zi + rock.vz * t));
                    <Rock
                        key={indx}
                        X={(rock.xi + rock.vx * t)/(1 - (rock.zi + rock.vz * t))}
                        Y={(rock.yi + rock.vy * t)/(1 - (rock.zi + rock.vz * t))}
                        Z={rock.zi + rock.vz * t}
                        color={`rgba(${rock.R}, ${rock.G}, ${rock.B}, 0.5)`}
                    />
                ))}
                </div>
            </>
        )
    }
}

export default Collection;
