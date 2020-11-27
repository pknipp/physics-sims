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
            leftT: 0.5,
            rightT: 1,
            alpha: 0.1,
            logN: 1,
            n: 10,
            dt: 100,
        }
    }

    componentDidMount() {this.makeDist(this.state.n)}

    handlerLogN = e => {
        let logN = Number(e.target.value);
        this.setState({ logN, n: Math.round(10 ** logN) }, () => this.makeDist());
    }

    handleInput = e => {
        let newState = {}
        newState[e.target.name] = Number(e.target.value);
        debugger
        this.setState(newState);
    }

    tick = _ => {
        debugger
        let nextT = this.state.time + this.state.dt/1000;
        this.setState({ time: nextT}, () => this.tridiag());
    }

    makeDist = _ => {
        let Ts = [];
        let coef = [];
        for (let m = 1; m < 10; m++) {
            coef.push(Math.random());
        }
        for (let i = 0; i < this.state.n; i++) {
            // Ts.push(1);
            Ts.push(Math.random());
            // Ts.push(Math.sin(Math.PI*i/this.state.n));
            // let T = 0;
            // for (let m = 1; m < 10; m++) {
            //     T += coef[m] * Math.sin(Math.PI * m * i/this.state.n);
            // }
            // Ts.push(Math.min(0,T));
        }
        this.setState({ Ts });
    }

    tridiag = _ => {
        let { n, Ts, leftIns, leftT, rightIns, rightT } = this.state;
        let alpha0 = this.state.alpha * this.state.dt * (n + 1) * (n + 1) / 1000;
        let a = new Array(n).fill(-alpha0/2);
        let b = new Array(n).fill(1 + alpha0);
        let c = new Array(n).fill(-alpha0/2);
        let r = new Array(n);
        let u = new Array(n);
        let g = new Array(n);
        if (this.state.leftIns ) b[0]     -= alpha0/2;
        if (this.state.rightIns) b[n - 1] -= alpha0/2;
        r[0] = Ts[0] + (Ts[1] - 2 * Ts[0] + (leftIns ? Ts[0] : 2 * leftT)) * alpha0 / 2;
        r[n-1] = Ts[n-1]+(Ts[n-2]-2*Ts[n-1]+(rightIns ? Ts[n-1]:2*rightT)) * alpha0 / 2;
        let bet = b[0];
        u[0] = r[0]/bet;
        for (let i = 1; i < n; i++) {
            g[i] = c[i - 1] / bet;
            bet = b[i] - a[i] * g[i];
            if (i < n - 1) r[i] = Ts[i] + ((Ts[i - 1] - Ts[i]) - (Ts[i] - Ts[i + 1])) * alpha0 / 2;
            u[i] = (r[i] - a[i] * u[i - 1]) / bet;
        }
        for (let i = n - 2; i >= 0; i--) {
            u[i] -= g[i + 1] * u[i + 1];
        }
        for (let i = 0; i < n; i++) {
            u[i] = (u[i] + Ts[i]) / 2;
        }
        this.setState({Ts: u});
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
        let leftT = (
            <div className="BC">
                <input
                    type="range"
                    onChange={this.handleInput}
                    name="leftT"
                    min="0"
                    max="1"
                    step="0.1"
                    value={this.state.leftT}
                />
            </div>
        )
        let rightT = (
            <div className="BC">
                <input
                    type="range"
                    onChange={this.handleInput}
                    name="rightT"
                    min="0"
                    max="1"
                    step="0.1"
                    value={this.state.rightT}
                />
            </div>
        )
        let bars = this.state.Ts.map((T, idx) => (
            <div key={`${idx}`}
                className="bar"
                style={{
                height:`${Math.round(600*T)}px`,
                width:`${Math.round(1000/this.state.n)}px`,
                }}>
            </div>
        ))
        return (
            <>
                <input
                    type="range"
                    onChange={this.handlerLogN}
                    name="logN"
                    min="0"
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
                <div className="bar-container">
                {leftT}
                <div className="bars">
                    {bars}
                </div>
                {rightT}
                </div>
            </>
        )
    }
}

export default Heat;
