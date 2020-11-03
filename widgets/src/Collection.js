import React from "react";
import Rock from "./Rock";
class Collection extends React.Component {
    constructor() {
        super();
        this.state = { time: new Date() }
    }
    tick = () => this.setState({ time: new Date() });
    componentDidMount() {this.interval = setInterval(this.tick, 100)}
    componentWillUnmount() {clearInterval(this.interval)}
    render() {
        let t = this.state.time.getSeconds();
        // debugger
        return (
            this.props.rocks.map((rock, indx) => {
                let Z = rock.zi + rock.vz * t;
                let X = (rock.xi + rock.vx * t)/(1 - Z);
                let Y = (rock.yi + rock.vy * t)/(1 - Z);
                // debugger
                return (
                    <Rock
                    key={indx}
                    X={X} Y={Y} Z={Z}
                    color={`rgba(${rock.R}, ${rock.G}, ${rock.B}, 0.5)`}
                    />
                )
            })
        )
    }
}

export default Collection;
