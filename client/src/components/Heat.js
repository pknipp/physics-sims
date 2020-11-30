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
            leftT: 0.4,
            rightT: 0.8,
            logAlpha: -2,
            logN: 1,
            logDt: 2,
            height: 600,
            width: 1000,
            mousePressed: false,
        }
    }

    componentDidMount() {
        let n = Math.round(10 ** this.state.logN);
        let dx = Math.round(this.state.width / n);
        let width = n * dx;
        let ny = Math.round(this.state.height/dx);
        let dy = Math.floor(this.state.height/ny);
        let height = ny * dy;
        let alpha = 10 ** this.state.logAlpha;
        let dt = 10 ** this.state.logDt;
        this.setState({ n, ny, dx, dy, height, width, alpha, dt }, () => this.makeDist());
    }

    handleLogN = e => {
        let logN = Number(e.target.value);
        let n = Math.round(10 ** logN);
        let dx = Math.round(this.state.width / n);
        let width = n * dx;
        let ny = Math.round(this.state.height/dx);
        let dy = Math.round(this.state.height/ny);
        let height = ny * dy;
        this.setState({ logN, n, ny, dx, dy, width, height, time: 0 }, () => this.makeDist());
    }
    handleLogDt = e => {
        let logDt = Number(e.target.value);
        this.setState({ logDt, dt: Math.round(10 ** logDt)});
    }
    handleLogAlpha = e => {
        let logAlpha = Number(e.target.value);
        this.setState({ logAlpha, alpha: 10 ** logAlpha });
    }

    handleInput = e => this.setState({[e.target.name]: Number(e.target.value)});
    handleCheckbox = e => this.setState({[e.target.name]: e.target.checked});

    handleMouseDown = _ => this.setState({ mousePressed: true });
    handleMouseUp   = _ => this.setState({ mousePressed: false});
    handleMouseEnter = e => {
        // debugger
        if (!this.state.mousePressed) return;
        let Ts = [...this.state.Ts];
        let coords = e.target.id.split("-");
        let row = Number(coords[0]);
        let col = Number(coords[1]);
        Ts[col] = row * this.state.dy / this.state.height;
        // let col = Number(e.target.id);
        // Ts[col] = e.offsetY / this.state.height;
        debugger
        this.setState({ Ts });
    }

    tick = _ => {
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
            // Ts.push(Math.sin(Math.PI*i/n));
            // let T = 0;
            // for (let m = 1; m < 10; m++) {
            //     T += coef[m] * Math.sin(Math.PI * m * i/n);
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
          this.setState({ time: this.state.time });
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
        let bars = this.state.Ts.map((T, idx) => {
            // debugger
            return (
            <div key={`${idx}`}
                className="bar"
                style={{
                height:`${Math.round(this.state.height*T)}px`,
                width:`${Math.round(this.state.width/this.state.n)}px`,
                }}>
            </div>
        )})
        let squares = [];
        for (let i = 0; i < this.state.ny; i++) {
            for (let j = 0; j < this.state.n; j++) {
                squares.push(
                    <div key={`${i}-${j}`}
                        id={`${i}-${j}`}
                        className="square"
                        name={`${i}-${j}`}
                        onMouseEnter={this.handleMouseEnter}
                        style={{
                        height:`${this.state.dy}px`,
                        bottom: `${i * this.state.dy}px`,
                        left: `${j * this.state.dx}px`,
                        width:`${this.state.dx}px`
                    }}>
                    </div>
                )
            }
        }
        // let stripes = [];
        // for (let j = 0; j < this.state.n; j++) {
        //     stripes.push(
        //         <div key={`${i}-${j}`}
        //             id={`${j}`}
        //             className="stripe"
        //             name={`${j}`}
        //             onMouseEnter={this.handleMouseEnter}
        //             style={{
        //             left: `${j * this.state.dx}px`,
        //             width:`${this.state.dx}px`
        //         }}>
        //         </div>
        //     )
        // }
        return (
            <div onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp}>
                <span>Resolution</span>
                <input
                    type="range"
                    onChange={this.handleLogN}
                    name="logN"
                    min="0"
                    max="2.5"
                    step="0.2"
                    value={this.state.logN}
                />
                <span>Timestep</span>
                <input
                    type="range"
                    onChange={this.handleLogDt}
                    name="logDt"
                    min="0"
                    max="3"
                    step="0.2"
                    value={this.state.logDt}
                />
                <span>Heat transport coefficient</span>
                <input
                    type="range"
                    onChange={this.handleLogAlpha}
                    name="logAlpha"
                    min="-3"
                    max="0"
                    step="0.2"
                    value={this.state.logAlpha}
                />
                <span className="button-container">
                    <button onClick={this.toggle}>
                        {this.state.running ? "Pause" : "Run"}
                    </button>
                </span>
                <span>
                time: {Math.round(100 * this.state.time)/100} s
                </span>
                <div>
                    Boundary conditions:
                    <div>
                        Is insulated on left?
                        <input
                            name="leftIns"
                            type="checkbox"
                            checked={this.state.leftIns}
                            onChange={this.handleCheckbox} />
                        Is insulated on right?
                        <input
                            name="rightIns"
                            type="checkbox"
                            checked={this.state.rightIns}
                            onChange={this.handleCheckbox} />
                            </div>
                </div>
                <div className="bar-container">
                {this.state.leftIns ? null : leftT}
                <div className="bars">
                    {this.state.running ? null : squares}
                    {/* {this.state.running ? null : stripes} */}
                    {bars}
                </div>
                {this.state.rightIns ? null : rightT}
                </div>
            </div>
        )
    }
}

export default Heat;
