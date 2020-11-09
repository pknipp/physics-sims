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
            dt: 3,
            logdt: 0.5,
            T: 0.5,
            k: 0.5
        }
        // this.dt = 5;
        // this.T = 0.5;
        // this.k = 0.5;
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

    handleDisp = e => {
        let i = e.target.name[1];
        let j = e.target.name[2];
        let k = e.target.name[3];
        let val = Number(e.target.value);
        // let iIC = Number(e.target.name.slice(1));
        // let k = (name === "x") ? 0 : (name === "y") ? 1 : 2;
        const newRs = JSON.parse(JSON.stringify(this.state.rs));
        newRs[i][j][k] = (val === "") ? "" : Number(val);
        debugger
        this.setState({rs: newRs});
    }

    handleVel = e => {
        let i = e.target.name[1];
        let j = e.target.name[2];
        let k = e.target.name[3];
        let val = Number(e.target.value);
        // let iIC = Number(e.target.name.slice(1));
        // let k = (name === "x") ? 0 : (name === "y") ? 1 : 2;
        const newVs = JSON.parse(JSON.stringify(this.state.vs));
        newVs[i][j][k] = (val === "") ? "" : Number(val);
        this.setState({rs: newVs});
    }

    // handleVel = e => {
    //     let k = e.target.name[1];
    //     let val = Number(e.target.value);
    //     // let iIC = Number(e.target.name.slice(1));
    //     // let k = (name === "x") ? 0 : (name === "y") ? 1 : 2;
    //     let newI = [...this.state.i];
    //     let newJ = [...this.state.j];
    //     let newVs = [...this.state.vs];
    //     const newVel = newVs[newI[iIC] - 1][newJ[iIC] - 1]
    //     newVel[k] = (val === "") ? "" : Number(val);
    //     newVs[newI[iIC] - 1][newJ[iIC] - 1] = newVel;
    //     this.setState({vs: newVs});
    // }

    nextFs = _ => {
        debugger
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
        debugger
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
        this.setState({vs: nextVs, KE}, () => this.nextRs(this.state.dt / 1000));
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
            <>
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
            </>
        )
        let returnMe = [chooseN];
        if (this.state.n && this.state.isLattice) {
            // let { n } = this.state;
            let { time } = this.state
            let numPx = 540;
            let rComponents = (

                    this.state.rs.map((col, i, rs) => {
                        return col.map((r, j, col) => {
                            let X = numPx * (this.state.xs[i] + this.state.rs[i][j][0] + 0.5);
                            let Y = numPx * (this.state.ys[j] + this.state.rs[i][j][1] + 0.5);
                            let X0 = numPx * (this.state.xs[i] + 0.5);
                            let Y0 = numPx * (this.state.ys[j] + 0.5);
                            // let xL = (i === 0) ? 0 : numPx * (this.props.xs[i - 1] + this.state.rs[i - 1][j] [0]  + 0. 5);
                            // let yL = numPx * (0.5 + this.props.ys[j] + ((i === 0) ? 0 : this.state.rs[i - 1] [j]  [1]));
                            return (
                                <div key={this.state.n * i + j}>
                                <Object
                                    X0={X0}
                                    Y0={Y0}
                                    X={X}
                                    Y={Y}
                                    Z={this.state.rs[i][j][2]}
                                    width={numPx * this.state.width}
                                    backgroundColor={i % 2 === j % 2 ? "red" : "blue"}
                                />
                                {/* <svg className="isaac" viewBox={`0 0 100 100`} xmlns="http://www.w3.org/    2000/   svg">
                                    <line x1={xL} y1={yL/2} x2={X/2} y2={Y/2} stroke="black" />
                                </svg> */}
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
                        handleDisp={this.handleDisp}
                        handleVel={this.handleVel}
                    />
                )
            }
            let controls = (
                <>
                    <div className="controls">
                        <button onClick={this.toggle}>
                            {this.state.running ? "Pause" : "Run"}
                        </button>
                        <ul>
                            <li> time: {Math.floor(100 * time)/100} s</li>
                            <li>Energy:
                                <ul>
                                    <li> potential: {Math.floor(1000 * this.state.PE)/1000} </li>
                                    <li> kinetic: {Math.floor(1000 * this.state.KE)/1000} </li>
                                    <li> total: {Math.floor(1000 * (this.state.PE + this.state.KE))/1000}</li>
                                </ul>
                            </li>
                            <li>
                                Simulation speed (pause before adjusting):
                                <div>
                                    slow
                                    <input
                                        type="range"
                                        onChange={this.handleSpeed}
                                        name="speed"
                                        min="0"
                                        max="1"
                                        step="0.1"
                                        value={speed}
                                    />
                                    regular
                                </div>
                            </li>
                            <li>Damping (or "viscosity"):
                                <div>
                                    none
                                    <input
                                        type="range"
                                        onChange={this.handleDamping}
                                        name="damping"
                                        min="0"
                                        max="2"
                                        step="0.1"
                                        value={damping}
                                    />
                                    much
                                </div>
                            </li>
                            <li>Timestep (logarithmic scale):
                                <div>
                                    1 ms
                                    <input
                                        type="range"
                                        onChange={this.handleLogTimeStep}
                                        name="logtimestep"
                                        min="0"
                                        max="3"
                                        step="0.15"
                                        value={logdt}
                                    />
                                    1 s
                                </div>
                                <div>
                                    (Present value is {dt} ms.)
                                </div>
                            </li>
                            <li>Type of restoring force:
                                <div>
                                    spring-like
                                    <input
                                        type="range"
                                        onChange={this.handleForceType}
                                        name="forcetype"
                                        min="0"
                                        max="1"
                                        step="0.1"
                                        value={this.state.T}
                                    />
                                    tension-like
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="container">
                        <div className="drumhead">
                            {rComponents}
                        </div>
                        <div className="right-side">
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
                        </div>

                    </div>
                </>
            )
            returnMe.push(controls)
        }
        return (
            <div className="controls">
                {returnMe}
            </div>
        )
    }
}

export default Collection;
