import React from "react";
import Object from "./Object";
class Collection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            now: 0,
            running: false,
            start: 0,
            xs: this.props.xs,
            ys: this.props.ys,
            rs: this.props.rs,
            vs: this.props.vs,
            Fs: this.props.Fs,
            n: this.props.nx,
        }
        this.nx = this.props.nx;
        this.ny = this.props.ny;
        this.k = this.nx * this.ny;
        this.dt = 5;
        this.options = new Array(this.props.nx).fill(0).map((_, idx) => idx + 1);
    }

    tick = () => {
        this.setState(
            {now: new Date().valueOf()},
            () => this.nextFs()
        );
    }

    nextFs = _ => {
        debugger;
        const { rs } = this.state;
        const nextFs = [];
        for (let i = 0; i < this.nx; i++) {
            const Fcol = [];
            for (let j = 0; j < this.ny; j++) {
                const rL = (i === 0)     ? [0, 0, 0] : rs[i - 1][j];
                const rR = (i === this.nx - 1)? [0, 0, 0] : rs[i + 1][j];
                const rU = (j === 0)     ? [0, 0, 0] : rs[i][j - 1];
                const rD = (j === this.ny - 1)? [0, 0, 0] : rs[i][j + 1];
                debugger
                Fcol.push([
                    (-6 * rs[i][j][0] + 2 * (rL[0] + rR[0]) + rU[0] + rD[0]) * this.k,
                    (-6 * rs[i][j][1] + 2 * (rU[1] + rD[1]) + rL[0] + rR[0]) * this.k,
                    (-4 * rs[i][j][2] + rL[2] + rR[2] + rU[2] + rD[2]) * this.k,
                ]);
                debugger
            }
            debugger
            nextFs.push(Fcol);
            debugger
        }
        debugger
        this.setState({Fs: nextFs}, () => this.nextVs(this.dt/1000));
    }

    nextVs = dt => {
        debugger
        const { vs, Fs } = this.state;
        const nextVs = [];
        for (let i = 0; i < this.nx; i++) {
            const nextVcol = [];
            for (let j = 0; j < this.ny; j++) {
                const nextV = [];
                for (let k = 0; k < 3; k++) {
                    nextV.push(vs[i][j][k] + Fs[i][j][k] * dt)
                }
                nextVcol.push(nextV);
            }
            nextVs.push(nextVcol);
        }
        debugger
        this.setState({vs: nextVs}, () => this.nextRs(this.dt/1000));
    }

    nextRs = dt => {
        debugger
        const { rs, vs } = this.state;
        const nextRs = [];
        for (let i = 0; i < this.nx; i++) {
            const nextRcol = [];
            for (let j = 0; j < this.ny; j++) {
                const nextR = [];
                for (let k = 0; k < 3; k++) {
                    nextR.push(rs[i][j][k] + vs[i][j][k] * dt)
                }
                nextRcol.push(nextR);
            }
            nextRs.push(nextRcol);
        }
        debugger
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
        let t = (this.state.now - this.state.start) / 1000;
        let numPx = 540;
        let rComponents = this.state.rs.map((col, i, rs) => {
            return col.map((r, j, col) => {
                let X = numPx * (this.props.xs[i] + this.state.rs[i][j][0] + 0.5);
                let Y = numPx * (this.props.ys[j] + this.state.rs[i][j][1] + 0.5);
                let X0 = numPx * (this.props.xs[i] + 0.5);
                let Y0 = numPx * (this.props.ys[j] + 0.5);
                // let xL = (i === 0) ? 0 : numPx * (this.props.xs[i - 1] + this.state.rs[i - 1][j][0] + 0.5);
                // let yL = numPx * (0.5 + this.props.ys[j] + ((i === 0) ? 0 : this.state.rs[i - 1][j][1]));
                debugger
                return (
                    <div key = {this.props.ny * i + j}>
                    <Object
                        X0={X0}
                        Y0={Y0}
                        X={X}
                        Y={Y}
                        Z={this.state.rs[i][j][2]}
                        width={numPx * this.props.width}
                        backgroundColor={i % 2 === j % 2 ? "red" : "blue"}
                    />
                    {/* <svg className="isaac" viewBox={`0 0 100 100`} xmlns="http://www.w3.org/2000/svg">
                        <line x1={xL} y1={yL/2} x2={X/2} y2={Y/2} stroke="black" />
                    </svg> */}
                    </div>
                )
            })
        })
        return (
            <div>
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
                    <div>
                        <h2>Specify "initial conditions" below:</h2>
                        <form action="" method="get" className="ic">
                            <div className="ic">
                                <label htmlFor="coords">Choose a particle: </label>
                                <input type="text" name="coords" id="coords" />
                            </div>
                            <div className="ic">
                                <label htmlFor="displacement">Displacement from equilibrium: </label>
                                <input type="text" name="displacement" id="displacement" />
                            </div>
                            <div className="ic">
                                <label htmlFor="velocity">Particle's initial velocity: </label>
                                <input type="text" name="velocity" id="velocity" />
                            </div>
                            <div className="ic">
                                <input type="submit" value="Submit" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Collection;
