import React from "react";
import Rock from "./Rock";
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
        this.x = this.props.x;
        this.y = this.props.y
    }

    tick = () => this.setState({
        now: new Date().valueOf(),

    });

    nextFs = _ => {
        const { rs } = this.state;
        const nextFs = [];
        for (let i = 0; i < this.nx; i++) {
            const Fcol = [];
            for (let j = 0; i < this.ny; j++) {
                const rL = (i === 0)     ? [0, 0, 0] : rs[i - 1][j];
                const rR = (i === this.nx - 1)? [0, 0, 0] : rs[i + 1][j];
                const rU = (j === 0)     ? [0, 0, 0] : rs[i][j - 1];
                const rD = (j === this.ny - 1)? [0, 0, 0] : rs[i][j + 1];
                Fcol.push([
                    -4 * rs[i][j][0] + rL[0] + rR[0] + rU[0] + rD[0],
                    -4 * rs[i][j][1] + rL[1] + rR[1] + rU[1] + rD[1],
                    -4 * rs[i][j][2] + rL[2] + rR[2] + rU[2] + rD[2],
                ]);
            }
            nextFs.push(Fcol);
        }
        this.setState({Fs: nextFs}, () => this.nextVs(0.001));
    }

    nextVs = dt => {
        const { vs, Fs } = this.state;
        const nextVs = [];
        for (let i = 0; i < this.nx; i++) {
            const nextVcol = [];
            for (let j = 0; i < this.ny; j++) {
                const nextV = [];
                for (let k = 0; k < 3; k++) {
                    nextV.push(vs[i][j][k] + Fs[i][j][k] * dt)
                }
                nextVcol.push(nextV);
            }
            nextVs.push(nextVcol);
        }
        this.setState({vs: nextVs}, () => this.nextRs(0.001));
    }

    nextRs = dt => {
        const { rs, vs } = this.state;
        const nextRs = [];
        for (let i = 0; i < this.nx; i++) {
            const nextRcol = [];
            for (let j = 0; i < this.ny; j++) {
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
          this.interval = setInterval(() => this.tick(), 100);
          this.setState({start: new Date().valueOf()});
        } else {
          clearInterval(this.interval);
          this.interval = null;
        }
        this.setState({ running });
    };

    render() {
        let t = (this.state.now - this.state.start) / 1000;
        let rComponents = this.state.rs.map((col, i) => {
            return col.map((r, j) => {
                return <Rock
                    key={this.props.ny * i + j}
                    X={this.props.xs[i] + this.state.rs[i][j][0]}
                    Y={this.props.ys[j] + this.state.rs[i][j][1]}
                    Z={this.state.rs[i][j][2]   }
                />
            })
        })
        return (
            <>
                <div>
                    <p>time: {t} s</p>
                    <button onClick={this.toggle}>
                        {this.state.running ? "Stop" : "Start"}
                    </button>
                </div>
                {rComponents}
            </>
        )
    }
}

export default Collection;
