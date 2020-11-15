import React from "react";
import Rock from "./Rock";
class Asteroids extends React.Component {
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
          clearInterval(this.interval);
          this.interval = null;
        }
        this.setState({ running });
      };

    // componentDidMount() {this.interval = setInterval(this.tick, 10)}
    // componentWillUnmount() {clearInterval(this.interval)}

    render() {
        let t = (this.state.now - this.state.start) / 1000;
        let rockComponents = this.props.rocks.map((rock, indx) => {
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
                    <p>time: {t} s</p>
                    <button onClick={this.toggle} style={{zIndex:1000}}>
                        {this.state.running ? "Stop" : "Start"}
                    </button>
                </div>
                {rockComponents}
            </>
        )
    }
}

export default Asteroids;
