import React from "react";
// import Object from "./Object";
import Row from "./drum/Row";
import Graph from "./drum/Graph";
import Sliders from "./drum/Sliders";
import Drumhead from "./drum/Drumhead";
import IC from "./drum/IC";
class Collection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            running: false,
            time: 0,
            n: 1,
            nIC: 1,
            optionsI: ["row", 1],
            optionsJ: ["column", 1],
            rvs: [[[0.4, 0, 0.5, 0, 0.3, 0]]],
            damping: 0,
            speed: 1,
            i: [1],
            j: [1],
            PE: 0,
            KE: 0,
            E: 0,
            Ei: 0,
            logdt: 2.4,
            T: 0.4,
            showBond: true,
            velocityLength: 0.5,
            accelerationLength: 0.5,
            calcEi: false,
            springConstant: 2,
        }
    }

    componentDidMount() {this.makeLattice(this.state.n)}

    tick = _ => {
        let nextT = this.state.time + this.state.dt/1000;
        this.setState({time: nextT}, () => this.nextRvs())
    }

    handleN = e => {
        this.setState(
            {n: Number(e.target.value), isLattice: false},
            () => this.makeLattice(this.state.n)
        );
    }
    handleLogdt = e => {
        const logdt = Number(e.target.value);
        this.setState({logdt, dt: Math.round(10 ** logdt)});
    }
    handleIC = e => {
        let [i, j, k] = e.target.name.split("").map(char => Number(char));
        let val = e.target.value;
        let rvs = JSON.parse(JSON.stringify(this.state.rvs));
        rvs[i][j][k] = (val === "") ? "" : Number(val);
        this.setState({rvs});
    }
    handleIndex = e => {
        const name = e.target.name;
        const iNew = [...this.state.i];
        const jNew = [...this.state.j];
        const newIndices = {i: iNew, j: jNew};
        newIndices[name[0]][Number(name.slice(1))] = Number(e.target.value);
        this.setState(newIndices);
    }
    // The following method handles many inputs
    handleInput = e => {
        const newState = {};
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    }

    handleCheckbox = e => {
        const newState = {};
        newState[e.target.name] = e.target.checked;
        this.setState(newState);
    }

    makeLattice = n => {
        let xs = [];
        let zero6 = [];
        let optionsI = ["col"];
        let optionsJ = ["row"];
        for (let i = 0; i < n; i++) {
          xs.push(-0.5 + (i + 1)/(n + 1));
          const colZero6 = [];
          for (let j = 0; j < n; j++) {
            colZero6.push([0,0,0,0,0,0]);
          }
          optionsI.push(i + 1);
          optionsJ.push(i + 1);
          zero6.push(colZero6);
        }
        let ys  = JSON.parse(JSON.stringify(xs));
        let rvs = JSON.parse(JSON.stringify(zero6));
        rvs[0][0] = JSON.parse(JSON.stringify(this.state.rvs[0][0]));
        let Fs = JSON.parse(JSON.stringify(zero6));
        const newState = {xs, ys, rvs,
            Fs, zero6, dt: Math.round(10 ** this.state.logdt),
            optionsI, optionsJ, width: 0.2/n, isLattice: true};
        this.setState(newState)
    }

    // Calculate (generalized) force, KE, PE, and E for a particular point in phase space
    Fs = rvs => {
        const { damping, n, T, springConstant } = this.state;
        let kConst = 1 - T;
        let Fs = JSON.parse(JSON.stringify(this.state.zero6));
        let PEk = 0;
        let PET = 0;
        let KE = 0;
        for (let i = 0; i < n; i++) {
            PEk += rvs[0][i][0] ** 2 + rvs[i][0][1] ** 2;
            PET +=
                rvs[0][i][1] ** 2 + rvs[0][i][2] ** 2 +
                rvs[i][0][0] ** 2 + rvs[i][0][2] ** 2;
            for (let j = 0; j < n; j++) {
                for (let k = 0; k < 3; k++) {
                    Fs[i][j][k] = rvs[i][j][k + 3];
                    KE += rvs[i][j][k + 3] * rvs[i][j][k + 3];
                }
                const rL = (i === 0)     ? [0, 0, 0] : rvs[i - 1][j];
                const rR = (i === n - 1)? [0, 0, 0] : rvs[i + 1][j];
                const rU = (j === 0)     ? [0, 0, 0] : rvs[i][j - 1];
                const rD = (j === n - 1)? [0, 0, 0] : rvs[i][j + 1];
                Fs[i][j][3] = - damping * rvs[i][j][3] + springConstant * (
                        kConst * (-2 * rvs[i][j][0] + rL[0] + rR[0])
                        + T * (-2 * rvs[i][j][0] + rU[0] + rD[0]));
                Fs[i][j][4] = - damping * rvs[i][j][4] + springConstant * (
                        kConst * (-2 * rvs[i][j][1] + rU[1] + rD[1])
                        + T * (-2 * rvs[i][j][1] + rL[1] + rR[1]));
                Fs[i][j][5] = - damping * rvs[i][j][5] + springConstant *
                            T * (-4 * rvs[i][j][2] + rL[2] + rR[2] + rU[2] + rD[2]);
                let dxR = rvs[i][j][0] - rR[0];
                let dyD = rvs[i][j][1] - rD[1];
                PEk += dxR * dxR + dyD * dyD;
                PET +=
                    (rvs[i][j][0] - rD[0]) ** 2 + (rvs[i][j][2] - rD[2]) ** 2 +
                    (rvs[i][j][1] - rR[1]) ** 2 + (rvs[i][j][2] - rR[2]) ** 2;
            }
        }
        KE /= 2;
        PEk *= springConstant * kConst / 2;
        PET *= springConstant * T / 2;
        const PE = PET + PEk;
        const E = PE + KE;
        return [Fs, KE, PE, E];
    }
        // With the present phase-space coordinate ...
        // 1) ... finds the present generalized force,
        // 2) ... propagates through phase-space for a particular amount of time (= dt/2),
        // 3) ... and then returns the final value of the generalized force.
        nextFs = (Fs, m) => {
            let rvs = JSON.parse(JSON.stringify(this.state.rvs));
            for (let i = 0; i < this.state.n; i++) {
                for (let j = 0; j < this.state.n; j++) {
                    for (let k = 0; k < 6; k++) {
                        rvs[i][j][k] += Fs[i][j][k] * this.state.dt / 1000 / m;
                    }
                }
            }
            return this.Fs(rvs)[0];
        }

        // 4th-order Runge-Kutta method for propagating thru phase-space for a timestep dt
        // This also sets state for the generalized force and the KE, PE, and E.
    nextRvs = _ => {
        let all4 = this.Fs(this.state.rvs);
        let Fs1 = all4[0];
        let Fs2 = this.nextFs(Fs1, 2);
        let Fs3 = this.nextFs(Fs2, 2);
        let Fs4 = this.nextFs(Fs3, 1);

        let nextRvs = JSON.parse(JSON.stringify(this.state.rvs));
        for (let i = 0; i < this.state.n; i++) {
            for (let j = 0; j < this.state.n; j++) {
                for (let k = 0; k < 6; k++) {
                    nextRvs[i][j][k] += (
                        Fs1[i][j][k] + Fs4[i][j][k] + 2 * (Fs2[i][j][k] + Fs3[i][j][k])
                        ) * this.state.dt/ 1000 / 6;
                }
            }
        }
        let E = all4[3];
        let Ei = (this.state.calcEi) ? this.state.Ei : E;
        this.setState({rvs: nextRvs, Fs: Fs1, KE: all4[1], PE: all4[2], E, Ei, calcEi: true});
    }

    toggle = () => {
        const running = !this.state.running;
        if (running) {
          this.interval = setInterval(
              this.tick,
              Math.round(this.state.dt/Math.max(0.1, this.state.speed)));
          this.setState({t: 0});
        } else {
          clearInterval(this.interval);
          this.interval = null;
        }
        this.setState({ running });
    };


    render() {
        let numPx = 540;
        let { n, rvs, velocityLength, accelerationLength, showBond } = this.state;
        let Rows = [];
        for (let iIC = 0; iIC < this.state.nIC; iIC++) {
            Rows.push(
                <Row
                    key={iIC}
                    optionsI={this.state.optionsI}
                    optionsJ={this.state.optionsJ}
                    rvs={rvs}
                    i={this.state.i}
                    j={this.state.j}
                    iIC={iIC}
                    handleIndex={this.handleIndex}
                    handleIC={this.handleIC}
                />
            )
        }

        return (
            <div className="container">
                <div className="side">
                    <form>
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
                    <div className="controls">
                        <span className="button-container">
                            <button onClick={this.toggle}>
                                {this.state.running ? "Pause" : "Run"}
                            </button>
                        </span>
                        time: {Math.round(100 * this.state.time)/100} s
                    </div>
                    <Graph KE={this.state.KE} PE={this.state.PE} E={this.state.E} Ei={this.state.Ei} />
                    <div
                        className="drumContainer"
                        style={{
                            height: `${numPx}px`,
                            width: `${numPx}px`
                        }}
                    >
                        <>
                            {(!this.state.isLattice) ? null :
                                <Drumhead
                                    n={n}
                                    xs={this.state.xs}
                                    ys={this.state.ys}
                                    rvs={rvs}
                                    Fs={this.state.Fs}
                                    width={this.state.width}
                                    velocityLength={velocityLength}
                                    accelerationLength={accelerationLength}
                                    showBond={showBond}
                                    dt={this.state.dt}
                                />
                            }
                        </>
                    </div>
                </div>
                <div className="side">
                    <Sliders
                        speed={this.state.speed}
                        damping={this.state.damping}
                        logdt={this.state.logdt}
                        dt={this.state.dt}
                        T={this.state.T}
                        velocityLength={this.state.velocityLength}
                        accelerationLength={this.state.accelerationLength}
                        showBond={this.state.showBond}
                        handleInput={this.handleInput}
                        handleCheckbox={this.handleCheckbox}
                        handleLogdt={this.handleLogdt}
                    />
                    <IC
                        nIC={this.state.nIC}
                        n={n}
                        i={this.state.i}
                        j={this.state.j}
                        rvs={this.state.rvs}
                        optionsI={this.state.optionsI}
                        optionsJ={this.state.optionsJ}
                        handleInput={this.handleInput}
                        handleIndex={this.handleIndex}
                        handleIC={this.handleIC}
                    />
                </div>
            </div>
        )
    }
}

export default Collection;
