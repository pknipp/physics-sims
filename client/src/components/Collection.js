import React from "react";
import Object from "./Object";
import Row from "./Row";
class Collection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            now: 0,
            running: false,
            start: 0,
            time: 0,
            n: 1,
            nIC: 1,
            damping: 0,
            speed: 1,
            i: [],
            j: [],
            PE: 0,
            KE: 0,
            E: 0,
            Ei: 0,
            dt: 31,
            logdt: 1.5,
            T: 0,
            k: 1,
            bondThickness: 1,
            velocityLength: 1,
            accelerationLength: 1,
            calcEi: false,
        }
    }

    componentDidMount() {
        console.log("Component did mount.")
        this.makeLattice(this.state.n)
    }

    tick = _ => {
        let nextT = this.state.time + this.state.dt/1000;
        this.setState({time: nextT}, () => this.nextRvs())
    }

    handleN = e => this.setState({n: Number(e.target.value)}, () => this.makeLattice(this.state.n));
    handleNIC = e => this.setState({nIC: Number(e.target.value)});
    submitN = e => e.preventDefault();
    handleDamping = e => this.setState({damping: Number(e.target.value)});
    handleSpeed = e => this.setState({speed: Number(e.target.value)});
    handleLogTimeStep = e => {
        const logdt = Number(e.target.value);
        this.setState({logdt, dt: Math.floor(10 ** logdt)});
    }
    handleForceType = e => {
        const T = Number(e.target.value);
        this.setState({T, k: 1 - T});
    }
    handleIndex = e => {
        const iNew = [...this.state.i];
        const jNew = [...this.state.j];
        const newIndices = {i: iNew, j: jNew};
        newIndices[e.target.name].push(Number(e.target.value));
        this.setState(newIndices);
    }

    makeLattice = n => {
        let springConstant = (n + 1) * (n + 1);
        let xs = [];
        let ys = [];
        let zero6 = [];
        let optionsI = ["col"];
        let optionsJ = ["row"];
        for (let i = 0; i < n; i++) xs.push(-0.5 + (i + 1)/(n + 1));
        for (let j = 0; j < n; j++) ys.push(-0.5 + (j + 1)/(n + 1));
        for (let i = 0; i < n; i++) {
          const colZero6 = [];
          for (let j = 0; j < n; j++) {
            colZero6.push([0,0,0,0,0,0]);
          }
          optionsI.push(i + 1);
          optionsJ.push(i + 1);
          zero6.push(colZero6);
        }
        let rvs = JSON.parse(JSON.stringify(zero6));
        let Fs = JSON.parse(JSON.stringify(zero6));
        const newState = {springConstant, xs, ys, rvs, Fs, zero6,
            optionsI, optionsJ, width: 0.2/n, isLattice: true};
        this.setState(newState)
    }

    handleIC = e => {
        let i = Number(e.target.name[0]);
        let j = Number(e.target.name[1]);
        let k = Number(e.target.name[2]);
        let val = e.target.value;
        const newIC = JSON.parse(JSON.stringify(this.state.rvs));
        newIC[i][j][k] = (val === "") ? "" : Number(val);
        this.setState({rvs: newIC});
    }

    handleSize = e => {
        const newState = {};
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    }

    Fs = rvs => {
        // const isFirst = rvs === this.state.rvs;
        const { damping } = this.state;
        let Fs = JSON.parse(JSON.stringify(this.state.zero6));
        let PEk = 0;
        // let PET = 0;
        let KE = 0;
        for (let i = 0; i < this.state.n; i++) {
            for (let j = 0; j < this.state.n; j++) {
                for (let k = 0; k < 3; k++) {
                    Fs[i][j][k] = rvs[i][j][k + 3];
                    KE += rvs[i][j][k + 3] * rvs[i][j][k + 3];
                }
                const rL = (i === 0)     ? [0, 0, 0] : rvs[i - 1][j];
                const rR = (i === this.state.n - 1)? [0, 0, 0] : rvs[i + 1][j];
                const rU = (j === 0)     ? [0, 0, 0] : rvs[i][j - 1];
                const rD = (j === this.state.n - 1)? [0, 0, 0] : rvs[i][j + 1];
                Fs[i][j][3] = - damping * rvs[i][j][3] + this.state.springConstant * (
                        this.state.k * (-2 * rvs[i][j][0] + rL[0] + rR[0]) +
                        this.state.T * (-2 * rvs[i][j][0] + rU[0] + rD[0]));
                Fs[i][j][4] = - damping * rvs[i][j][4] + this.state.springConstant * (
                        this.state.k * (-2 * rvs[i][j][1] + rL[1] + rR[1]) +
                        this.state.T * (-2 * rvs[i][j][1] + rU[1] + rD[1]));
                Fs[i][j][5] = - damping * rvs[i][j][5] + this.state.springConstant *
                        this.state.T * (-4 * rvs[i][j][2] + rL[2] + rR[2] + rU[2] + rD[2]);
                let dxL = rvs[i][j][0] - rL[0];
                let dxR = rvs[i][j][0] - rR[0];
                let dyU = rvs[i][j][1] - rU[1];
                let dyD = rvs[i][j][1] - rD[1];
                PEk += dxL * dxL + dxR * dxR + dyU * dyU + dyD * dyD;
            }
        }
        KE /= 2;
        PEk *= this.state.springConstant * this.state.k / 2;
        // debugger
        // if (isFirst) this.setState(Fs);
        return [Fs, KE, PEk];
    }

    nextRvs = _ => {
        const { rvs, dt } = this.state;
        let firstCall = this.Fs(rvs);
        let Fs1 = firstCall[0];

        let rvs2 = JSON.parse(JSON.stringify(rvs));
        for (let i = 0; i < this.state.n; i++) {
            for (let j = 0; j < this.state.n; j++) {
                for (let k = 0; k < 6; k++) {
                    rvs2[i][j][k] += Fs1[i][j][k] * dt/1000;
                }
            }
        }
        let Fs2 = this.Fs(rvs2)[0];

        let nextRvs = JSON.parse(JSON.stringify(rvs));
        for (let i = 0; i < this.state.n; i++) {
            for (let j = 0; j < this.state.n; j++) {
                for (let k = 0; k < 6; k++) {
                    nextRvs[i][j][k] += (
                        Fs1[i][j][k] + Fs2[i][j][k]
                        ) * dt/ 1000 / 2;
                }
            }
        }
        this.setState({rvs: nextRvs, Fs: Fs1, KE: firstCall[1], PE: firstCall[2], E: firstCall[1] + firstCall[2]});
    }

    toggle = () => {
        const running = !this.state.running;
        if (running) {
          this.interval = setInterval(this.tick, Math.floor(this.state.dt/this.state.speed));
          this.setState({t: 0});
        } else {
          clearInterval(this.interval);
          this.interval = null;
        }
        this.setState({ running });
    };

    render() {
        let { n } = this.state;
        const chooseN = (
            <form onSubmit={this.submitN}>
                <label>How many particles should be along each edge? </label>
                <input
                    type="number"
                    onChange={this.handleN}
                    placeholder="# of particles"
                    value={String(n)}
                    min="1"
                    step="1"
                />
            </form>
        )
        let leftSide = [chooseN];
// Following 4 lines are needed for scoping & may be removed after the conditional is removed
        let slider = null;
        let IC = null;
        let controls = null;
        let rComponents = null;
        let numPx = 540;
        if (this.state.n && this.state.isLattice) {
            // let { n } = this.state;
            let { time } = this.state
            rComponents = (

                    this.state.xs.map((x, i, xs) => {
                        return this.state.ys.map((y, j, ys) => {
                            let X0 = numPx * (x + 0.5);
                            let Y0 = numPx * (y + 0.5);
                            let X = X0 + numPx * this.state.rvs[i][j][0];
                            let Y = Y0 + numPx * this.state.rvs[i][j][1];
        // coefficients on following 4 lines are not that crucial
                            let Vx = 3 * numPx * this.state.rvs[i][j][3]/n;
                            let Vy = 3 * numPx * this.state.rvs[i][j][4]/n;
                            let Ax = 3 * numPx * this.state.Fs[i][j][3]/n/n;
                            let Ay = 3 * numPx * this.state.Fs[i][j][4]/n/n;
                            debugger
                            let XL;
                            let YL;
                            let XU;
                            let YU;
                            if (i === 0) {
                                XL = 0;
                                YL = numPx * (y + 0.5)
                            } else {
                                XL = numPx * (xs[i - 1] + 0.5 + this.state.rvs[i - 1][j][0]);
                                YL = numPx * (y + 0.5 + this.state.rvs[i - 1][j][1]);
                            }
                            if (j === 0) {
                                YU = 0;
                                XU = numPx * (x + 0.5)
                            } else {
                                XU = numPx * (x + 0.5 + this.state.rvs[i][j - 1][0]);
                                YU = numPx * (ys[j - 1] + 0.5 + this.state.rvs[i][j - 1][1]);
                            }
                            return (
                                <div key={this.state.n * i + j}>
                                <Object
                                    X0={X0}
                                    Y0={Y0}
                                    X={X}
                                    Y={Y}
                                    Z={this.state.rvs[i][j][2]}
                                    XL={XL}
                                    YL={YL}
                                    XU={XU}
                                    YU={YU}
                                    XD={(j === n - 1) ? numPx * (x + 0.5): null}
                                    YD={(j === n - 1) ? numPx: null}
                                    XR={(i === n - 1) ? numPx: null}
                                    YR={(i === n - 1) ? numPx * (y + 0.5): null}
                                    Vx={Vx}
                                    Vy={Vy}
                                    Ax={Ax}
                                    Ay={Ay}
                                    bondThickness={this.state.bondThickness}
                                    velocityLength={this.state.velocityLength}
                                    accelerationLength={this.state.accelerationLength}
                                    width={numPx * this.state.width}
                                    // backgroundColor={i % 2 === j % 2 ? "red" : "blue"}
                                />

                                </div>
                            )
                        })
                    })

            )
            let { i, j, optionsI, optionsJ, rvs, damping, speed, nIC, logdt, dt } = this.state;
            let Rows = [];
            for (let iIC = 0; iIC < nIC; iIC++) {
                Rows.push(
                    <Row
                        key={iIC}
                        optionsI={optionsI}
                        optionsJ={optionsJ}
                        rvs={rvs}
                        i={i}
                        j={j}
                        iIC={iIC}
                        handleIndex={this.handleIndex}
                        handleIC={this.handleIC}
                    />
                )
            }
            let Efac = (this.state.Ei) ? this.state.Ei : (this.state.PE) ? this.state.PE : 1;
            // The following numerator is arbitrary, to give bar chart "right" height
            Efac = Efac/6;
            controls = (
                <div className="controls">
                    <span className="button-container">
                    <button onClick={this.toggle}>
                        {this.state.running ? "Pause" : "Run"}
                    </button>
                    </span>
                    time: {Math.floor(100 * time)/100} s

                    <div className="graph container">
                        <div className="title">
                            <h3>Energies (arbitrary units)</h3>
                        </div>
                        <div className="title ke">kinetic (KE)</div>
                        <div className="title pe">potential (PE)</div>
                        <div className="title tot">total (KE + PE)</div>
                        <div className="title i">initial</div>
                        <div className="val ke">
                            {Math.floor(1000 * this.state.KE)/1000}
                        </div>
                        <div className="val pe">
                            {Math.floor(1000 * this.state.PE)/1000}
                        </div>
                        <div className="val tot">
                           {Math.floor(1000 * this.state.E)/1000}
                        </div>
                        <div className="val i">
                           {Math.floor(1000 * this.state.Ei)/1000}
                        </div>
                        <div
                            className="bar ke" style={{height:`${Math.floor(10 * this.state.KE/Efac)}px`}}>
                        </div>
                        <div
                            className="bar pe" style={{height:`${Math.floor(10 * this.state.PE/Efac)}px`}}>
                        </div>
                        <div
                            className="bar tot" style={{height:`${Math.floor(10 * this.state.E/Efac)}px`}}>
                        </div>
                        <div
                            className="bar i" style={{height:`${Math.floor(10 * this.state.Ei/Efac)}px`}}>
                        </div>
                    </div>
                </div>
            )
            leftSide.push(controls);
            leftSide.push(rComponents);

            slider = (
                <div className="slider">
                    <h2>Simulation parameters:</h2>
                    <table>
                        <thead>
                            <tr>
                                <th colSpan="4" align="left"> Slider functionality</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr rowSpan="2">
                                <td>
                                    Simulation speed:
                                </td>
                                <td>
                                    slow
                                </td>
                                <td>
                                    <input
                                        type="range"
                                        onChange={this.handleSpeed}
                                        name="speed"
                                        min="0"
                                        max="1"
                                        step="0.1"
                                        value={speed}
                                    />
                                </td>
                                <td>
                                    regular
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="4" align="left">
                                    ("Pause/Run" before change takes affect.)
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Damping (or "viscosity"):
                                </td>
                                <td>
                                    none
                                </td>
                                <td>
                                    <input
                                        type="range"
                                        onChange={this.handleDamping}
                                        name="damping"
                                        min="0"
                                        max="2"
                                        step="0.1"
                                        value={damping}
                                    />
                                </td>
                                <td>
                                    much
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Timestep (logarithmic scale):
                                </td>
                                <td>
                                     1 ms
                                </td>
                                <td>
                                    <input
                                        type="range"
                                        onChange={this.handleLogTimeStep}
                                        name="logtimestep"
                                        min="0"
                                        max="3"
                                        step="0.15"
                                        value={logdt}
                                    />
                                </td>
                                <td>
                                     1 s
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="4" align="left">
                                    (Present value is {dt} ms.)
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Type of restoring force:
                                </td>
                                <td>
                                    spring-like
                                </td>
                                <td>
                                    <input
                                        type="range"
                                        onChange={this.handleForceType}
                                        name="forcetype"
                                        min="0"
                                        max="1"
                                        step="0.1"
                                        value={this.state.T}
                                    />
                                </td>
                                <td>
                                    tension-like
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Length of velocity arrow (green dotted):
                                </td>
                                <td>
                                    0
                                </td>
                                <td>
                                    <input
                                        type="range"
                                        onChange={this.handleSize}
                                        name="velocityLength"
                                        min="0"
                                        max="1"
                                        step="0.1"
                                        value={this.state.velocityLength}
                                    />
                                </td>
                                <td>
                                    max
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Length of acceleration arrow (red):
                                </td>
                                <td>
                                    0
                                </td>
                                <td>
                                    <input
                                        type="range"
                                        onChange={this.handleSize}
                                        name="accelerationLength"
                                        min="0"
                                        max="1"
                                        step="0.1"
                                        value={this.state.accelerationLength}
                                    />
                                </td>
                                <td>
                                    max
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Width of "bond" lines (black):
                                </td>
                                <td>
                                    invisible
                                </td>
                                <td>
                                    <input
                                        type="range"
                                        onChange={this.handleSize}
                                        name="bondThickness"
                                        min="0"
                                        max="2"
                                        step="1"
                                        value={this.state.bondThickness}
                                    />
                                </td>
                                <td>
                                    max
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {/* <div>
                        <input type="checkbox" id="velocity" checked={this.state.showVelname="showVel"        onChange={this.handleVector}/>
                        <label htmlFor="velocity">Do you want to see each particle's velocitvector?</     label>
                    </div> */}
                </div>
            );

            IC = (
                <>
                    <h2>Initial conditions:</h2>
                    <span>
                        Specify the number of particles that you'll displace from equilibrium.
                    </span>
                    <div>
                        <label htmlFor="nIC">number = </label>
                        <input
                            type="number"
                            name="nIC"
                            onChange={this.handleNIC}
                            value={nIC} />
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th colSpan="2" align="center">choose particle's</th>
                                <th colSpan="3">displacement</th>
                                <th colSpan="3">velocity</th>
                            </tr>
                            <tr>
                                <td colSpan="2">row and column</td>
                                <td align="center">x</td><td align="center">y</td><td align="center">z</td>
                                <td align="center">x</td><td align="center">y</td><td align="center">z</td>
                            </tr>
                        </thead>
                        <tbody>
                            {Rows}
                        </tbody>
                    </table>
                </>
            );
        }

        return (
            <div className="container">
                <div className="side">
                    {chooseN}
                    {controls}
                    <div
                        className="drumContainer"
                        style={{
                            height: `${numPx}px`,
                            width: `${numPx}px`
                        }}
                    >
                        {rComponents}
                    </div>
                </div>
                <div className="side">
                    {slider}
                    {IC}
                </div>
            </div>
        )
    }
}

export default Collection;
