import React from "react";
import Button from "../Button";
class Heat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            running: false,
            time: 0,
            Ts: [],
            leftIns: false,
            rightIns: false,
            leftT: 0.2,
            rightT: 0.6,
            logAlpha: -2,
            logN: 1.5,
            logDt: 2,
            width: 1000,
            mousePressed: false,
            info: {instructions: true},
        }
        this.height = 500;
        this.info = {
            dx: "This controls the width of each bar on the graph below.  Narrower bars means more accurate results, but the calculations may take longer, and the click-and-drag process may become 'glitchy'.",
            dt: "This controls the extent of the approximatation used when computing derivatives with respect to time.  Shorter timesteps make the results more accurate but may make the simulation run slowly.",
            alpha: "The thermal diffusivity of a material is proportional to its thermal conductivity.  The thermal conductivity is a measure of how easily heat flows thru the material.  For instance the thermal conductivity of metal is much higher than that of cloth or wood, which is why you use a wooden utensil to stir boiling soup rather than a metal one.",
            BC: "There are two types of 'boundary conditions' (BC) which you may find at either end of an object: insulating ('Neumann') or 'fixed temperature ('Dirichlet').  Insulating BC means that no heat flows out of or into that end of the object, in which case the first derivative of the temperature profile (T<sub>x</sub>) is zero at that end, ie the curve is flat. Fixed-temperature BC means that T equals a specified value at that end.  For this type of BC you may control that value of T with the slider at that end of the graph.",
            instructions :
            "The heights of the gray bars graphed below indicate the system's 'temperature profile'. The default value of the system's 'initial conditions' has been set to equal the system's 'steady state' profile.  This means that the temperature profile will not change when you run the simulation unless you first change the initial conditions as follows:",
            steps : [
                "Ensure that the simulation is not running.",
                "Click (and hold) in the margin to the left of the graph.",
                "Drag the mouse slowly across the graph.",
                "Release the mouse button after you've reached the right side of the graph."
            ]
        }
    }

    componentDidMount() {
        let n = Math.round(10 ** this.state.logN);
        let dx = Math.round(this.state.width / n);
        let width = n * dx;
        let alpha = 10 ** this.state.logAlpha;
        let dt = 10 ** this.state.logDt;
        this.setState({ n, dx, width, alpha, dt }, () => this.makeDist());
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

    handleInput = e => this.setState({[e.target.name]: Number(e.target.value)},()=>this.makeDist());
    handleCheckbox = e => this.setState({[e.target.name]: e.target.checked}, () => this.makeDist());
    handleToggle = e => {
        let name = e.target.name;
        let info = this.state.info;
        info[name] = !this.state.info[name];
        this.setState({ info });
    }
    handleMouseDown = _ => this.setState({ mousePressed: true });
    handleMouseUp   = _ => this.setState({ mousePressed: false});
    handleMouseLeave = e => {
        if (!this.state.mousePressed) return;
        let Ts = [...this.state.Ts];
        let col = Number(e.target.id);
        Ts[col] = (1 - e.nativeEvent.offsetY / this.height);
        // For all but 1st column, take avg of two heights
        if (col > 0) Ts[col] = (Ts[col] + Ts[col - 1]) / 2;
        this.setState({ Ts, time: 0 });
    }

    tick = _ => {
        let nextT = this.state.time + this.state.dt/1000;
        this.setState({ time: nextT}, () => this.tridiag());
    }

    makeDist = _ => {
        let {n, leftIns, rightIns, leftT, rightT} = this.state;
        let Ts = [];
        if (leftIns && rightIns) {
            Ts = new Array(n).fill(0.5);
        } else {
            let slope = (leftIns || rightIns) ? 0 : (rightT - leftT) / n;
            let T = leftIns ? rightT : leftT;
            Ts[0] = T;
            for (let i = 1; i < n; i++) {
                Ts.push(T += slope);
            }
        }
        this.setState({ Ts });
    }

    tridiag = _ => {
        let { n, Ts, leftIns, leftT, rightIns, rightT } = this.state;
        let alpha0 = this.state.alpha * this.state.dt * (n + 1) * (n + 1) / 1000;
        // diagonal element of matrix to be inverted
        let b = new Array(n).fill(1 + alpha0);
        // off-diagonal elements of matrix to be inverted
        let a = new Array(n).fill(-alpha0/2);
        let c = new Array(n).fill(-alpha0/2);
        // inhomogeneous part of matrix equation
        let r = new Array(n);
        // solution of matrix equation
        let u = new Array(n);
        // working vector for solution algorithm
        let g = new Array(n);
        // adjustments for the which type of BC is used
        if (this.state.leftIns ) b[0]     -= alpha0/2;
        if (this.state.rightIns) b[n - 1] -= alpha0/2;
        r[0] = Ts[0] + (Ts[1] - 2 * Ts[0] + (leftIns ? Ts[0] : 2 * leftT)) * alpha0 / 2;
        r[n-1] = Ts[n-1]+(Ts[n-2]-2*Ts[n-1]+(rightIns ? Ts[n-1]:2*rightT)) * alpha0 / 2;
        let bet = b[0];
        u[0] = r[0]/bet;
        // decomposition and forward substitution
        for (let i = 1; i < n; i++) {
            g[i] = c[i - 1] / bet;
            bet = b[i] - a[i] * g[i];
            if (i < n - 1) r[i] = Ts[i] + ((Ts[i - 1] - Ts[i]) - (Ts[i] - Ts[i + 1])) * alpha0 / 2;
            u[i] = (r[i] - a[i] * u[i - 1]) / bet;
        }
        // backsubstitution
        for (let i = n - 2; i >= 0; i--) {
            u[i] -= g[i + 1] * u[i + 1];
        }
        // 2-timestep averaging in order to smooth out Gibbs-phenomenon oscillations
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
            <div className="BC" style={{height: `${this.height}px`}}>
                <input
                    type="range"
                    onChange={this.handleInput}
                    name="leftT"
                    min="0"
                    max="1"
                    step="0.1"
                    value={this.state.leftT}
                    style={{
                        width: `${this.height}px`,
                        transformOrigin: `${this.height/2}px ${this.height/2}px`
                    }}
                />
            </div>
        )
        let rightT = (
            <div className="BC" style={{height: `${this.height}px`}}>
                <input
                    type="range"
                    onChange={this.handleInput}
                    name="rightT"
                    min="0"
                    max="1"
                    step="0.1"
                    value={this.state.rightT}
                    style={{
                        width: `${this.height}px`,
                        transformOrigin: `${this.height/2}px ${this.height/2}px`
                    }}
                />
            </div>
        )
        let bars = this.state.Ts.map((T, idx) => {
            return (
            <div key={`${idx}`}
                className="bar"
                style={{
                height:`${Math.round(this.height*T)}px`,
                width:`${Math.round(this.state.width/this.state.n)}px`,
                transitionDuration: `${this.state.dt / 1000}s`
                }}>
            </div>
        )})

        let stripes = [];
        for (let j = 0; j < this.state.n; j++) {
            stripes.push(
                <div key={`${j}`}
                    id={`${j}`}
                    className="stripe"
                    name={`${j}`}
                    onMouseLeave={this.handleMouseLeave}
                    style={{
                    height:`${this.height}px`,
                    left: `${j * this.state.dx}px`,
                    width:`${this.state.dx}px`
                }}>
                </div>
            )
        }
        return (
            <div onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp}>
                <>
                    <h2 align="center">Simulation parameters:</h2>
                    <div className="parameters">
                        <div className="button-container">
                            <button onClick={this.toggle}>
                                {this.state.running ? "Pause" : "Run"}
                            </button>
                            <div>time: {Math.round(100 * this.state.time)/100} s</div>
                        </div>
                        <table className="sliders">
                            <thead>
                                <tr>
                                    <th colSpan="5" align="center"> (logarithmic) slider controls</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Spatial resolution: </td>
                                    <td>coarse</td>
                                    <td>
                                        <input
                                            type="range"
                                            onChange={this.handleLogN}
                                            name="logN"
                                            min="0.2"
                                            max="2.5"
                                            step="0.2"
                                            value={this.state.logN}
                                        />
                                    </td>
                                    <td>fine</td>
                                    <td><Button onClick={this.handleToggle} name="dx" toggle={this.state.info.dx} /></td>
                                </tr>
                                <tr><td colSpan="5"><i>{this.state.info.dx ? this.info.dx : null}</i></td></tr>
                                <tr>
                                    <td>Timestep: </td>
                                    <td align="right">1 ms</td>
                                    <td>
                                        <input
                                            type="range"
                                            onChange={this.handleLogDt}
                                            name="logDt"
                                            min="0"
                                            max="3"
                                            step="0.2"
                                            value={this.state.logDt}
                                        />
                                    </td>
                                    <td>1 s</td>
                                    <td><Button onClick={this.handleToggle} name="dt" toggle={this.state.info.dt} /></td>
                                </tr>
                                <tr><td colSpan="5"><i>{this.state.info.dt ? this.info.dt : null}</i></td></tr>
                                <tr>
                                    <td>Thermal diffusivity: </td>
                                    <td align="right">low</td>
                                    <td>
                                        <input
                                            type="range"
                                            onChange={this.handleLogAlpha}
                                            name="logAlpha"
                                            min="-3"
                                            max="0"
                                            step="0.2"
                                            value={this.state.logAlpha}
                                        />
                                    </td>
                                    <td>high</td>
                                    <td><Button onClick={this.handleToggle} name="alpha" toggle={this.state.info.alpha} /></td>
                                </tr>
                                <tr><td colSpan="5"><i>{this.state.info.alpha ? this.info.alpha : null}</i></td></tr>
                            </tbody>
                        </table>
                        <table className="BC">
                            <thead>
                                <tr>
                                    <>
                                        <th colSpan="3">boundary conditions:</th>
                                        <th>
                                            <Button onClick={this.handleToggle} name="BC" toggle={this.state.info.BC} />
                                        </th>
                                    </>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td colSpan="4"><i>{this.state.info.BC ? this.info.BC : null}</i></td></tr>
                                <tr>
                                    <td rowSpan="2">Is this system insulated at its ...</td>
                                    <td> left end? </td>
                                    <td>
                                        <input
                                            name="leftIns"
                                            type="checkbox"
                                            checked={this.state.leftIns}
                                            onChange={this.handleCheckbox}
                                        />
                                    </td>
                                    <td rowSpan="2">{(this.state.leftIns && this.state.rightIns) ? null : 'Adjust temperature with vertical slider.'}</td>
                                </tr>
                                <tr>
                                    <td> right end? </td>
                                    <td>
                                        <input
                                            name="rightIns"
                                            type="checkbox"
                                            checked={this.state.rightIns}
                                            onChange={this.handleCheckbox}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <Button
                        name="instructions"
                        onClick={this.handleToggle}
                        toggle={this.state.instructions}
                    />
                    <i>{!this.state.info.instructions ? null :
                        <>
                            <div>{this.info.instructions}</div>
                            <ul>
                                {this.info.steps.map(step => (<li>{step}</li>))}
                            </ul>
                        </>
                    }</i>
                    {/* <div>
                        <span>Hide instructions?</span>
                        <span>
                            <input
                                name="hideInstructions"
                                type="checkbox"
                                checked={this.state.hideInstructions}
                                onChange={this.handleToggle}
                            />
                        </span>
                    </div>
                    {instructions} */}
                    {/* <ul>
                        {steps.map(step => (<li>{step}</li>))}
                    </ul> */}
                    <div className="bar-container">
                            {this.state.leftIns ? null : leftT}
                            <div className="bars"
                                style={{height:`${this.height}px`}}>
                                {this.state.running ? null : stripes}
                                {bars}
                            </div>
                            {this.state.rightIns ? null : rightT}
                    </div>
                </>
            </div>
        )
    }
}

export default Heat;
