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
            Fs: this.props.Fs
        }
        this.nx = this.props.nx;
        this.ny = this.props.ny;
        this.k = this.nx * this.ny;
        this.dt = 5
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
        let rComponents = this.state.rs.map((col, i, rs) => {
            return col.map((r, j, col) => {
                debugger
                return (
                    <>
                    <Object
                        key={this.props.ny * i + j}
                        X0={this.props.xs[i]}
                        Y0={this.props.ys[j]}
                        X={this.props.xs[i] + this.state.rs[i][j][0]}
                        Y={this.props.ys[j] + this.state.rs[i][j][1]}
                        Z={this.state.rs[i][j][2]}
                        nx={this.nx}
                        ny={this.ny}
                        width={this.props.width}
                        backgroundColor={i % 2 === j % 2 ? "red" : "blue"}
                    />
                    <svg viewBox="0 0 550 550" xmlns="http://www.w3.org/2000/svg">
                    </svg>
                    </>
                )
            })
        })
        return (
            <div className="drumHead">
                <div>
                    <p>time: {t} s</p>
                    <button onClick={this.toggle}>
                        {this.state.running ? "Stop" : "Start"}
                    </button>
                </div>
                <div>
                    {rComponents}
                </div>
            </div>
        )
    }
}

export default Collection;
