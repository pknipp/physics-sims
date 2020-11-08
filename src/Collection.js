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
            nIC: 0,
            damping: 0,
            speed: 1,
            i: [],
            j: []
        }
        this.dt = 5;
    }

    componentDidMount() {this.makeLattice(this.state.n)}

    // tick = _ => this.setState({now: new Date().valueOf()}, () => this.nextFs());
    tick = _ => {
        let nextT = this.state.time + this.dt/1000;
        this.setState({time: nextT}, () => this.nextFs())
    }

    handleN = e => this.setState({n: Number(e.target.value)}, () => this.makeLattice(this.state.n));
    handleNIC = e => {
        debugger
        let nIC = Number(e.target.value);
        debugger
        this.setState({nIC})
        // , () => {
        //         let i = new Array(nIC).fill(0);
        //         let j = new Array(nIC).fill(0);
        //         this.setState({i, j})
        //     }
        // );
    };

    submitN = e => e.preventDefault();
    handleDamping = e => this.setState({damping: Number(e.target.value)});
    handleSpeed = e => {
        debugger
        this.setState({speed: Number(e.target.value)});
    }
    handleIndex = e => {
        debugger
        const iNew = [...this.state.i];
        const jNew = [...this.state.j];
        const newIndices = {i: iNew, j: jNew};
        newIndices[e.target.name].push(Number(e.target.value));
        debugger
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
        let name = e.target.name[0];
        let val = Number(e.target.value);
        let iIC = Number(e.target.name.slice(1));
        debugger
        let k = (name === "x") ? 0 : (name === "y") ? 1 : 2;
        let newI = [...this.state.i];
        let newJ = [...this.state.j];
        let newRs = [...this.state.rs];
        debugger;
        const newDisp = newRs[newI[iIC] - 1][newJ[iIC] - 1]
        // const newDisp = [...this.state.rs[this.state.i[iIC] - 1][this.state.j[iIC] - 1]];
        newDisp[k] = (val === "") ? "" : Number(val);
        newRs[newI[iIC] - 1][newJ[iIC] - 1] = newDisp;
        this.setState({rs: newRs});
    }

    handleVel = e => {
        let name = e.target.name[0];
        let val = Number(e.target.value);
        let iIC = Number(e.target.name.slice(1));
        let k = (name === "x") ? 0 : (name === "y") ? 1 : 2;
        let newI = [...this.state.i];
        let newJ = [...this.state.j];
        let newVs = [...this.state.vs];
        const newVel = newVs[newI[iIC] - 1][newJ[iIC] - 1]
        newVel[k] = (val === "") ? "" : Number(val);
        newVs[newI[iIC] - 1][newJ[iIC] - 1] = newVel;
        this.setState({vs: newVs});
    }

    nextFs = _ => {
        const { rs, vs, damping } = this.state;
        const nextFs = [];
        for (let i = 0; i < this.state.n; i++) {
            const Fcol = [];
            for (let j = 0; j < this.state.n; j++) {
                const rL = (i === 0)     ? [0, 0, 0] : rs[i - 1][j];
                const rR = (i === this.state.n - 1)? [0, 0, 0] : rs[i + 1][j];
                const rU = (j === 0)     ? [0, 0, 0] : rs[i][j - 1];
                const rD = (j === this.state.n - 1)? [0, 0, 0] : rs[i][j + 1];
                Fcol.push([
                    (-6 * rs[i][j][0] + 2 * (rL[0] + rR[0]) + rU[0] + rD[0]) * this.state.springConstant - damping * vs[i][j][0],
                    (-6 * rs[i][j][1] + 2 * (rU[1] + rD[1]) + rL[0] + rR[0]) * this.state.springConstant - damping * vs[i][j][1],
                    (-4 * rs[i][j][2] + rL[2] + rR[2] + rU[2] + rD[2]) * this.state.springConstant - damping * vs[i][j][2],
                ]);
            }
            nextFs.push(Fcol);
        }
        debugger
        this.setState({Fs: nextFs}, () => this.nextVs(this.dt /  1000));
    }

    nextVs = dt => {
        const { vs, Fs } = this.state;
        const nextVs = [];
        for (let i = 0; i < this.state.n; i++) {
            const nextVcol = [];
            for (let j = 0; j < this.state.n; j++) {
                const nextV = [];
                for (let k = 0; k < 3; k++) {
                    nextV.push(vs[i][j][k] + Fs[i][j][k] * dt)
                }
                nextVcol.push(nextV);
            }
            nextVs.push(nextVcol);
        }
        this.setState({vs: nextVs}, () => this.nextRs(this.dt / 1000));
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
        debugger
        const running = !this.state.running;
        if (running) {
          this.interval = setInterval(this.tick, Math.floor(this.dt/this.state.speed));
          this.setState({t: 0});
        //   this.setState({start: new Date().valueOf()});
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
            let { n } = this.state;
            // let t = (this.state.now - this.state.start) * this.state.speed / 1000;
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
            let { i, j, optionsI, optionsJ, rs, vs, damping, speed, nIC } = this.state;
            debugger
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
                        <span> time: {Math.floor(100 * time)/100} s</span>
                        <div>
                        <input
                            type="range"
                            onChange={this.handleSpeed}
                            name="speed"
                            min="0"
                            max="1"
                            step="0.1"
                            value={speed}
                        />
                        <label htmlFor="speed">Playback speed (pause before changing)</label>
                        </div>
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
                                        <td>x</td><td>y</td><td>z</td>
                                        <td>x</td><td>y</td><td>z</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Rows}
                                </tbody>
                            </table>
                        </div>

                        <div>
                            <input
                                type="range"
                                onChange={this.handleDamping}
                                name="damping"
                                min="0"
                                max="2"
                                step="0.1"
                                value={damping}
                            />
                            <label htmlFor="damping">Damping</label>
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
