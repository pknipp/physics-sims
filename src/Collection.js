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
            dt: 3,
            logdt: 0.5,
            T: 0.5,
            k: 0.5,
            bondThickness: 1,
            velocityLength: 1,
            accelerationLength: 1,
            calcEi: false,
        }
    }

    componentDidMount() {this.makeLattice(this.state.n)}

    tick = _ => {
        let nextT = this.state.time + this.state.dt/1000;
        this.setState({time: nextT}, () => this.nextFs())
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
        let springConstant = n * n;
        let xs = [];
        let ys = [];
        let rs = [];
        let vs = [];
        let Fs = [];
        let optionsI = ["col"];
        let optionsJ = ["row"];
        for (let i = 0; i < n; i++) xs.push(-0.5 + (i + 1)/(n + 1));
        for (let j = 0; j < n; j++) ys.push(-0.5 + (j + 1)/(n + 1));
        for (let i = 0; i < n; i++) {
          const colr = [];
          const colv = [];
          const colF = [];
          for (let j = 0; j < n; j++) {
            colr.push([0,0,0]);
            colv.push([0,0,0]);
            colF.push([0,0,0]);
          }
          optionsI.push(i + 1);
          optionsJ.push(i + 1);
          rs.push(colr);
          vs.push(colv);
          Fs.push(colF)
        }
        const newState = {springConstant, xs, ys, rs, vs, Fs, optionsI, optionsJ, width: 0.2/n, isLattice: true};
        this.setState(newState)
    }

    handleIC = e => {
        let rorvs = e.target.name[0] + "s";
        let i = Number(e.target.name[1]);
        let j = Number(e.target.name[2]);
        let k = Number(e.target.name[3]);
        let val = e.target.value;
        const newIC = JSON.parse(JSON.stringify(this.state[rorvs]));
        newIC[i][j][k] = (val === "") ? "" : Number(val);
        this.setState((rorvs === "rs") ? {rs: newIC} : {vs: newIC});
    }

    handleSize = e => {
        const newState = {};
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    }

    nextFs = _ => {
        const { rs, vs, damping } = this.state;
        const Fs = [];
        let PEk = 0;
        let PET = 0;
        for (let i = 0; i < this.state.n; i++) {
            const FCol = [];
            PEk += rs[0][i][0] ** 2 + rs[i][0][1] ** 2;
            PET +=
                rs[0][i][1] ** 2 + rs[0][i][2] ** 2 +
                rs[i][0][0] ** 2 + rs[i][0][2] ** 2;
            for (let j = 0; j < this.state.n; j++) {
                const rL = (i === 0)     ? [0, 0, 0] : rs[i - 1][j];
                const rR = (i === this.state.n - 1)? [0, 0, 0] : rs[i + 1][j];
                const rU = (j === 0)     ? [0, 0, 0] : rs[i][j - 1];
                const rD = (j === this.state.n - 1)? [0, 0, 0] : rs[i][j + 1];
                PEk += (rs[i][j][0] - rR[0]) ** 2 + (rs[i][j][1] - rD[1]) ** 2;
                PET +=
                    (rs[i][j][0] - rD[0]) ** 2 + (rs[i][j][2] - rD[2]) ** 2 +
                    (rs[i][j][1] - rR[1]) ** 2 + (rs[i][j][2] - rR[2]) ** 2;
                FCol.push([
                    - damping * vs[i][j][0] + this.state.springConstant * (
                        this.state.k * (-2 * rs[i][j][0] + rL[0] + rR[0]) +
                        this.state.T * (-2 * rs[i][j][0] + rU[0] + rD[0])
                    ),
                    - damping * vs[i][j][1] + this.state.springConstant * (
                        this.state.k * (-2 * rs[i][j][1] + rU[1] + rD[1]) +
                        this.state.T * (-2 * rs[i][j][1] + rL[1] + rR[1])
                    ),
                    - damping * vs[i][j][2] + this.state.springConstant * this.state.T * (
                        -4 * rs[i][j][2] + rL[2] + rR[2] + rU[2] + rD[2]),
                ]);
            }
            Fs.push(FCol);
        }
        PEk *= 0.5 * this.state.k * this.state.springConstant;
        PET *= 0.5 * this.state.T * this.state.springConstant;
        this.setState({Fs, PE: PEk + PET}, () => this.nextVs(this.state.dt /  1000));
    }

    nextVs = dt => {
        const { vs, Fs } = this.state;
        const nextVs = [];
        let KE = 0;
        for (let i = 0; i < this.state.n; i++) {
            const vCol = [];
            for (let j = 0; j < this.state.n; j++) {
                const v = [];
                for (let k = 0; k < 3; k++) {
                    v.push(vs[i][j][k] + Fs[i][j][k] * dt);
                    KE += vs[i][j][k] * vs[i][j][k];
                }
                vCol.push(v);
            }
            nextVs.push(vCol);
        }
        KE /= 2;
        let E = this.state.PE + KE;
        let Ei = (this.state.calcEi) ? this.state.Ei : E;
        this.setState({vs: nextVs, KE, E, Ei, calcEi: true}, () => this.nextRs(this.state.dt / 1000));
    }

    nextRs = dt => {
        const { rs, vs } = this.state;
        const nextRs = [];
        for (let i = 0; i < this.state.n; i++) {
            const nextRcol = [];
            for (let j = 0; j < this.state.n; j++) {
                const nextR = [];
                for (let k = 0; k < 3; k++) {
                    nextR.push(rs[i][j][k] + vs[i][j][k] * dt)
                }
                nextRcol.push(nextR);
            }
            nextRs.push(nextRcol);
        }
        this.setState({rs: nextRs});
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
                <label>How many particles should be along each edge?</label>
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

                    this.state.rs.map((col, i, rs) => {
                        return col.map((r, j, col) => {
                            let X0 = numPx * (this.state.xs[i] + 0.5);
                            let Y0 = numPx * (this.state.ys[j] + 0.5);
                            let X = X0 + numPx * this.state.rs[i][j][0];
                            let Y = Y0 + numPx * this.state.rs[i][j][1];
                            let Vx = numPx * this.state.vs[i][j][0]/n;
                            let Vy = numPx * this.state.vs[i][j][1]/n;
                            let Ax = numPx * this.state.Fs[i][j][0]/n;
                            let Ay = numPx * this.state.Fs[i][j][1]/n;
                            let XL;
                            let YL;
                            let XU;
                            let YU;
                            if (i === 0) {
                                XL = 0;
                                YL = numPx * (this.state.ys[j] + 0.5)
                            } else {
                                XL = numPx * (this.state.xs[i - 1] + 0.5 + this.state.rs[i - 1][j][0]);
                                YL = numPx * (this.state.ys[j] + 0.5 + this.state.rs[i - 1][j][1]);
                            }
                            if (j === 0) {
                                YU = 0;
                                XU = numPx * (this.state.xs[i] + 0.5)
                            } else {
                                XU = numPx * (this.state.xs[i] + 0.5 + this.state.rs[i][j - 1][0]);
                                YU = numPx * (this.state.ys[j - 1] + 0.5 + this.state.rs[i][j - 1][1]);
                            }
                            return (
                                <div key={this.state.n * i + j}>
                                <Object
                                    X0={X0}
                                    Y0={Y0}
                                    X={X}
                                    Y={Y}
                                    Z={this.state.rs[i][j][2]}
                                    XL={XL}
                                    YL={YL}
                                    XU={XU}
                                    YU={YU}
                                    XD={(j === n - 1) ? numPx * (this.state.xs[i] + 0.5): null}
                                    YD={(j === n - 1) ? numPx: null}
                                    XR={(i === n - 1) ? numPx: null}
                                    YR={(i === n - 1) ? numPx * (this.state.ys[j] + 0.5): null}
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
            let { i, j, optionsI, optionsJ, rs, vs, damping, speed, nIC, logdt, dt } = this.state;
            let Rows = [];
            for (let iIC = 0; iIC < nIC; iIC++) {
                Rows.push(
                    <Row
                        key={iIC}
                        optionsI={optionsI}
                        optionsJ={optionsJ}
                        rs={rs}
                        vs={vs}
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
                    <button onClick={this.toggle}>
                        {this.state.running ? "Pause" : "Run"}
                    </button>
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
