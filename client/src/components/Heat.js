import React from "react";
class Heat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            running: false,
            time: 0,
            n: 20,
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
        let { Ts, alpha, n, leftIns, rightIns, leftT, rightT, dt } = this.state;
        let alpha0 = alpha*dt/n/n;
        let nextTs = [];
        nextTs.push(Ts[1]/alpha0 + Ts[0] * (1 - 2/alpha0) + ((leftIns) ? Ts[0] : leftT)/alpha0);
        for (let i = 1; i < n - 1; i++) {
            nextTs.push((Ts[i + 1] + Ts[i - 1])/alpha0 + Ts[i] * (1 - 2/alpha0));
        }
        nextTs.push(Ts[n - 2]/alpha0 + Ts[n - 1] * (1 - 2/alpha0) + ((rightIns) ? Ts[n - 1] : rightT)/alpha0);
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
        let bars = this.state.Ts.map(T => (
            <div className="bar"
                style={{
                height:`${Math.round(600*T)}px`,
                width:`${Math.round(1000/this.state.n)}px`,
                }}>
            </div>
        ))
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
            <div className="bar-container">
                {bars}
            </div>
            </>
        )
    }
}

export default Heat;
