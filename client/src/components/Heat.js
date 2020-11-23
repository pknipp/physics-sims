import React from "react";
class Heat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            running: false,
            time: 0,
            Ts: [],
            leftIns: false,
            rightIns: false,
            leftT: 0.0,
            rightT: 0.0,
            alpha: 1,
            logN: 1,
            n: 1,
            dt: 1000,
        }
    }

    componentDidMount() {this.makeDist(this.state.n)}

    handlerLogN = e => {
        let logN = Number(e.target.value);
        this.setState({ logN, n: Math.round(10 ** logN) }, () => this.makeDist());
    }

    tick = _ => {
        let nextT = this.state.time + this.state.dt/1000;
        // this.setState({time: nextT}, () => this.nextTs())
        this.setState({ time: nextT}, () => this.tridiag());
    }

    makeDist = _ => {
        let Ts = [];
        for (let i = 0; i < this.state.n; i++) {
            Ts.push(1);
            // Ts.push(Math.random());
        }
        this.setState({ Ts });
    }

    tridiag = _ => {
        let { n, Ts, leftIns, leftT, rightIns, rightT } = this.state;
        let alpha0 = this.state.alpha * this.state.dt * n * n / 1000;
        let a = new Array(n).fill(-alpha0/2);
        let b = new Array(n).fill(1 + alpha0);
        let c = new Array(n).fill(-alpha0/2);
        let r = new Array(n);
        let u = new Array(n);
        let g = new Array(n);
        if (this.state.leftIns ) b[0]     -= alpha0/2;
        if (this.state.rightIns) b[n - 1] -= alpha0/2;
        r[0]  = (1 - alpha0) * Ts[0]  + (Ts[1] + (leftIns ? Ts[0] : leftT)) * alpha0 / 2;
        r[n-1]= (1 - alpha0) * Ts[n-1]+ (Ts[n-2]+(rightIns? Ts[n-1]: rightT))*alpha0/2;
        let bet = b[0];
        u[0] = r[0];
        for (let i = 1; i < n - 2; i++) {
            g[i] = c[i - 1] / bet;
            bet = b[i] - a[i] * g[i];
            r[i] = Ts[i] + (Ts[i - 1] - Ts[i] - Ts[i] + Ts[i + 1]) * alpha0 / 2;
            u[i] = (r[i] - a[i] * u[i - 1]) / bet;
        }
        for (let i = n - 2; i >= 0; i--) {
            u[i] -= g[i + 1] * u[i + 1];
        }
        this.setState({Ts: u});
    }

    nextTs = _ => {
        debugger
        let { Ts, alpha, n, leftIns, rightIns, leftT, rightT, dt } = this.state;
        let alpha0 = alpha*dt*n*n/1000;
        let nextTs = JSON.parse(JSON.stringify(Ts));
        nextTs[0] += alpha0 * ((Ts[1] - Ts[0]) + (-Ts[0] + ((leftIns) ? Ts[0] : leftT)));
        // nextTs.push(Ts[1]*alpha0 + Ts[0] * (1 - 2*alpha0) + ((leftIns) ? Ts[0] : leftT)*alpha0);
        for (let i = 1; i < n - 1; i++) {
            nextTs[i] += alpha0 * ((Ts[i + 1] - Ts[i]) + (Ts[i - 1] - Ts[i]));
            // nextTs.push((Ts[i + 1] + Ts[i - 1])*alpha0 + Ts[i] * (1 - 2*alpha0));
        }
        nextTs[n-1] += alpha0 * ((Ts[n-2] - Ts[n-1]) + (-Ts[n-1] + ((rightIns) ? Ts[n-1] : rightT)));
        // nextTs.push(Ts[n - 2]*alpha0 + Ts[n - 1] * (1 - 2*alpha0) + ((rightIns) ? Ts[n - 1] : rightT)*alpha0);
        debugger
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
        debugger;
        return (
            <>
                <input
                    type="range"
                    onChange={this.handlerLogN}
                    name="logN"
                    min="1"
                    max="3"
                    step="0.2"
                    value={this.state.logN}
                />
                <span className="button-container">
                    <button onClick={this.toggle}>
                        {this.state.running ? "Pause" : "Run"}
                    </button>
                </span>
                <span>
                time: {Math.round(100 * this.state.time)/100} s
                </span>
                <div className="heat-bar">
                    {bars}
                </div>
            </>
        )
    }
}

export default Heat;
