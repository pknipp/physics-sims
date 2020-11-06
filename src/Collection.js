import React from "react";
import Object from "./Object";
class Collection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            now: 0,
            running: false,
            start: 0,
            n: "",
            damping: 0.1
        }
        this.dt = 5;
    }

    makeLattice = n => {
        debugger
        let springConstant = n * n;
        let xs = [];
        let ys = [];
        let rs = [];
        let vs = [];
        let Fs = [];
        let optionsI = ["choose row"];
        let optionsJ = ["choose column"];
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
        const newState = {springConstant, xs, ys, rs, vs, Fs, optionsI, optionsJ, width: 0.2/n, isLattice: true, i: 0, j: 0};
        debugger
        this.setState(newState)
    }

    handleN = e => this.setState({n: Number(e.target.value)}, () => this.makeLattice(this.state.n));
    handleDamping = e => {
        debugger
            // this.setState({damping: valueAsNumber(e.target.value)}, () => this.nextFs());
        this.setState({damping: Number(e.target.value)}, () => this.nextFs());
    }

    handleIndex = e => {
        const newIndex = {};
        newIndex[e.target.name] = Number(e.target.value);
        this.setState(newIndex);
    }

    handleDisp = e => {
        debugger
        let name = e.target.name;
        let k = (name === "x") ? 0 : (name === "y") ? 1 : 2;
        const newDisp = [...this.state.rs[this.state.i - 1][this.state.j - 1]];
        newDisp[k] = Number(e.target.value);
        const newRs = [...this.state.rs];
        newRs[this.state.i - 1][this.state.j - 1] = newDisp;
        this.setState({rs: newRs});
    }

    handleVel = e => {
        debugger
        let name = e.target.name;
        let k = (name === "x") ? 0 : (name === "y") ? 1 : 2;
        const newVel = [...this.state.vs[this.state.i - 1][this.state.j - 1]];
        newVel[k] = Number(e.target.value);
        const newVs = [...this.state.vs];
        newVs[this.state.i - 1][this.state.j - 1] = newVel;
        debugger
        this.setState({vs: newVs});
    }

    tick = _ => this.setState({now: new Date().valueOf()}, () => this.nextFs());

    nextFs = _ => {
        debugger
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
        this.setState({Fs: nextFs}, () => this.nextVs(this.dt/1000));
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
        this.setState({vs: nextVs}, () => this.nextRs(this.dt/1000));
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
          this.interval = setInterval(() => this.tick(), this.dt);
          this.setState({start: new Date().valueOf()});
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
                <span>How many particles should be on each side of your lattice? </span>
                <input
                    type="number"
                    onChange={this.handleN}
                    placeholder="# of particles"
                    value={n}
                />
            </>
        )
        let returnMe = [chooseN];
        if (this.state.n && this.state.isLattice) {
            let { n } = this.state;
            let t = (this.state.now - this.state.start) / 1000;
            let numPx = 540;
            let rComponents = this.state.rs.map((col, i, rs) => {
                return col.map((r, j, col) => {
                    let X = numPx * (this.state.xs[i] + this.state.rs[i][j][0] + 0.5);
                    let Y = numPx * (this.state.ys[j] + this.state.rs[i][j][1] + 0.5);
                    let X0 = numPx * (this.state.xs[i] + 0.5);
                    let Y0 = numPx * (this.state.ys[j] + 0.5);
                    // let xL = (i === 0) ? 0 : numPx * (this.props.xs[i - 1] + this.state.rs[i - 1][j][0] + 0. 5);
                    // let yL = numPx * (0.5 + this.props.ys[j] + ((i === 0) ? 0 : this.state.rs[i - 1][j][1]));
                    return (
                        <div key = {this.state.n * i + j}>
                        <Object
                            X0={X0}
                            Y0={Y0}
                            X={X}
                            Y={Y}
                            Z={this.state.rs[i][j][2]}
                            width={numPx * this.state.width}
                            backgroundColor={i % 2 === j % 2 ? "red" : "blue"}
                        />
                        {/* <svg className="isaac" viewBox={`0 0 100 100`} xmlns="http://www.w3.org/2000/svg">
                            <line x1={xL} y1={yL/2} x2={X/2} y2={Y/2} stroke="black" />
                        </svg> */}
                        </div>
                    )
                })
            })
            let { i, j, optionsI, optionsJ, rs, vs, damping } = this.state;
            debugger
            let controls = (
                <>
                    <div className="controls">
                        <p>time: {t} s</p>
                        <button onClick={this.toggle}>
                            {this.state.running ? "Stop" : "Start"}
                        </button>
                    </div>
                    <div className="container">
                        <div className="drumhead">
                            {rComponents}
                        </div>
                        <div className="ic">
                            <h2>Initial conditions:</h2>
                            <div>
                                <span>Select a particle: </span>
                                <select onChange={this.handleIndex} name="i" value={i}>
                                    {optionsI.map((option, row) => <option key={row} value={row}>{option}</option>)}
                                </select>
                                <select onChange={this.handleIndex} name="j" value={j}>
                                    {optionsJ.map((option, col) => <option key={n + col} value={col}>{option}</option>)}
                                </select>
                            </div>
                            {(i === 0 || j === 0) ? null : <div>
                                <span>Specify the particle's initial displacement from equilibrium.</span>
                                <div>
                                    <label htmlFor="x">x-coordinate = </label>
                                    <input type="number" name="x" onChange={this.handleDisp} value={rs[i - 1][j - 1][0]} />
                                </div>
                                <div>
                                    <label htmlFor="y">y-coordinate = </label>
                                    <input type="number" name="y" onChange={this.handleDisp} value={rs[i - 1][j - 1][1]} />
                                </div>
                                <div>
                                    <label htmlFor="z">z-coordinate = </label>
                                    <input type="number" name="z" onChange={this.handleDisp} value={rs[i - 1][j - 1][2]} />
                                </div>
                                <span>Specify the particle's initial velocity.</span>
                                <div>
                                    <label htmlFor="x">x-component = </label>
                                    <input type="number" name="x" onChange={this.handleVel} value={vs[i - 1][j - 1][0]} />
                                </div>
                                <div>
                                    <label htmlFor="y">y-component = </label>
                                    <input type="number" name="y" onChange={this.handleVel} value={vs[i - 1][j - 1][1]} />
                                </div>
                                <div>
                                    <label htmlFor="z">z-component = </label>
                                    <input type="number" name="z" onChange={this.handleVel} value={vs[i - 1][j - 1][2]} />
                                </div>
                                <div>
                                    <input type="range" onChange={this.handleDamping} name="damping" min="0" max="2" step="0.1" value={damping} />
                                    <label htmlFor="volume">Damping</label>
                                </div>
                            </div>}
                        </div>
                    </div>
                </>
            )
            returnMe.push(controls)
        }
        return returnMe
    }
}

export default Collection;
