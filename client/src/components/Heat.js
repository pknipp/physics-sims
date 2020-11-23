import React from "react";
class Heat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            running: false,
            time: 0,
            n: 5,
            Ts: [],
            leftIns: true,
            rightIns: true,
            leftT: 0.2,
            rightT: 0.8,
            alpha: 10,
            dt: 100,
        }
    }

    componentDidMount() {this.makeDist(this.state.n)}

    tick = _ => {
        let nextT = this.state.time + this.state.dt/1000;
        this.setState({time: nextT}, () => this.nextTs())
    }

    makeDist = _ => {
        let Ts = [];
        for (let i = 0; i < this.state.n; i++) {
            Ts.push(Math.random());
        }
        this.setState({ Ts });
    }

    nextTs = _ => {
        let { Ts, alpha, n, leftIns, rightIns, leftT, rightT } = this.state
        let nextTs = [];
        nextTs.push(Ts[1]/alpha + Ts[0] * (1 - 2/alpha) + ((leftIns) ? Ts[0] : leftT)/alpha);
        for (let i = 1; i < n - 1; i++) {
            nextTs.push((Ts[i + 1] + Ts[i - 1])/alpha + Ts[i] * (1 - 2/alpha));
        }
        nextTs.push(Ts[n - 2]/alpha + Ts[n - 1] * (1 - 2/alpha) + ((rightIns) ? Ts[n - 1] : rightT)/alpha);
        this.setState({ Ts: nextTs });
    }

    toggle = () => {
        const running = !this.state.running;
        if (running) {
          this.interval = setInterval(this.tick, this.state.dt);
          this.setState({time: 0});
        } else {
          clearInterval(this.interval);
          this.interval = null;
        }
        this.setState({ running });
    };

    render() {
        let rows = this.state.Ts.map(T => <li>{T}</li>);
        return (
            <>
            <span className="button-container">
                <button onClick={this.toggle}>
                    {this.state.running ? "Pause" : "Run"}
                </button>
            </span>
            <span>
            time: {Math.round(100 * this.state.time)/100} s
            </span>
            <ul>
                {rows}
            </ul>
            </>
        )
    }
}

export default Heat;
