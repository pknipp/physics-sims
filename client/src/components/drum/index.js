import React from "react";
// import Row from "./row/index";
import Graph from "./graph/index";
import Sliders from "./sliders/index";
import Drumhead from "./drumhead/index";
import IC from "./ic/index";
import Button from '../Button';
class Drum extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            running: false,
            time: 0,
            n: 2,
            nIC: 1,
            optionsI: ["row", 1],
            optionsJ: ["column", 1],
            rvs: [[[0.25, 0, 0.6, 0, 0.6, 0]]],
            damping: 0,
            speed: 1,
            i: [1],
            j: [1],
            PE: 0,
            KE: 0,
            E: 0,
            Ei: 0,
            logdt: 2.2,
            T: 0.4,
            showBond: true,
            velocityLength: 0.5,
            accelerationLength: 0.5,
            calcEi: false,
            springConstant: 2,
            info: {},
        }
        this.numPx = 540;
        this.info = {
            energy: "This system's kinetic energy (KE) equals the sum of the KE of each of the particles, and each particle's KE is proportional to the square of its speed.  The system's potential potential energy (PE) equals the sum of the PE of each of the bonds, and each bond's PE is proportional to the square of the amount by which it has been distorted from it 'equilibrium' size and shape.  In the absence of damping the total energy of this system should not change.  If the total does change, you should probably decrease the time-step.",
            KE: "This system's KE equals the sum of the KE of each of the particles, and each particle's KE is proportional to the square of its speed.",
            PE: "The system's PE equals the sum of the PE of each of the bonds, and each bond's PE is proportional to the square of the amount by which it has been distorted from it 'equilibrium' size and shape.",
            E: "In the absence of damping the total energy of this system should not change.  If the total does change, you should probably decrease the timestep.",
            damping: "Viscous damping is like friction, in that it resists the particle's forward motion.  If there is no damping in this system, the particles will move forever and their energy will not change.  If there is damping, the particles will eventually stop moving.",
            logdt: "This controls the extent of the approximation used when computing derivatives with respect to time.  Shorter timesteps make the results more accurate but may make the simulation run slowly.",
            T: "When a particle moves away from its 'equilibrium' position (indicated by the dashed circle), the bonds push the particle back towards equilibrium.  This is called a 'restoring force'.  These bonds exert two types of restoring forces.  One is like that of a spring, which pushes when compressed and pulls when stretched.  The other is like a violin string which is under tension (and it is this type of force which leads to the oscillations which are perpendicular to the screen).  This slider enables you to control the extent to which this restoring force is like one type or the other.",
            springConstant: "For larger values of the stiffness, the particles will vibrate back and forth more frequently, and conversely for smaller values.  In fact if the stiffness is zero, each particle will obey Newton's first law by either remaining stationary or by moving in a straight line at a constant speed. By the way, the technical term for stiffness is 'spring constant'. ",
            velocityLength: "Velocity is an example a vector, a quantity that has both 'magnitude' (size) and direction.  The dotted green line segment shown here points in the direction of the velocity, and the segment's length is proportional to the velocity's magnitude (which is usually called 'speed').  This slider controls the proportionality factor of this relationship.",
            accelerationLength: "Acceleration is an example a vector, a quantity that has both 'magnitude' (size) and direction.  The solid red line segment shown here points in the direction of the acceleration.  (Note that the velocity and acceleration usually do not point in the same direction!) The segment's length is proportional to the acceleration's magnitude, and this slider controls the proportionality factor of this relationship.",
            IC: "'Initial conditions' (IC) are required for the solution to any differential equation.  In this case, that means specifying the values of two things at a specific moment (time = 0 s) for each particle in this system: (a) displacement and (b) velocity.",
            nIC: `You may choose this number may be as small as zero and as large as ${this.state.n} x ${this.state.n} = ${this.state.n * this.state.n}.  However if you set the initial conditions to be all zero, absolute nothing will happen when you click 'RUN', because the system is at equilibrium.`,
            dx: "Each particle's displacement is measured relative to its equibrium position, which is indicated by the dashed circle.  The displacement is a vector which has x-, y-, and z-components: x is measured to the right, y is down, and z is out of the page.  The displacement is expressed in units in which '1' equals the square's sidelength.",
            v: "The initial velocity is a vector which has x-, y-, and z-components as follows: 'x' is rightward, 'y' is downward, and 'z' is out of the page.",
            n: "If you want to learn about all of the controls in this animation you should probably use only one particle.  However if you want to see a more realistic model for an actual drumhead (which has very many particles) you should use a larger number.  Note that large numbers of particles may make the animation run slowly.",
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
    //The following handles the on/off toggling of information panels.
    handleToggle = e => {
        let name = e.currentTarget.name;
        let info = {...this.state.info};
        info[name] = !info[name];
        this.setState({ info });
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

    // Calculate (generalized) force, KE, PE, and E for a particular point in phase space.
    // "rvs" is the triply nested array which contains the 3-dimensional positions ("r")
    // and velocities ("v") for all of the particles.
    Fs = rvs => {
        const { damping, n, T, springConstant } = this.state;
        let kConst = 1 - T;
        // This combo of a pair of JSON methods is a straightforward way to make
        // a deep clone of a nested object.
        let Fs = JSON.parse(JSON.stringify(this.state.zero6));
        // Initiallize two components of the potential energy: spring ("k") and stress ("T").
        let PEk = 0;
        let PET = 0;
        // Initialize the kinetic energy, which is summed for every particle in the system.
        let KE = 0;
        // Loop over rows of the drumhead.
        for (let i = 0; i < n; i++) {
            PEk += rvs[0][i][0] ** 2 + rvs[i][0][1] ** 2;
            PET +=
                rvs[0][i][1] ** 2 + rvs[0][i][2] ** 2 +
                rvs[i][0][0] ** 2 + rvs[i][0][2] ** 2;
            // loop over columns of the drumhead.
            for (let j = 0; j < n; j++) {
                for (let k = 0; k < 3; k++) {
                    // time-derivative of position coordinate is simply the velocity
                    Fs[i][j][k] = rvs[i][j][k + 3];
                    // increment total kinetic energy by the square of the velocity components
                    KE += rvs[i][j][k + 3] * rvs[i][j][k + 3];
                }
                // Determine the position of each particle's 4 neighbors
                // (some of which may be points on the wall).
                const rL = (i === 0)     ? [0, 0, 0] : rvs[i - 1][j];
                const rR = (i === n - 1)? [0, 0, 0] : rvs[i + 1][j];
                const rU = (j === 0)     ? [0, 0, 0] : rvs[i][j - 1];
                const rD = (j === n - 1)? [0, 0, 0] : rvs[i][j + 1];
                // Time-derivative of velocity coordinate for each particle is the force.
                // Force on each particle comes from its own velocity (if there is damping)
                // and from applying Hooke's law to the positions of its neighbors.
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
                // Increment the two types of potential energy, each of which is harmonic.
                PEk += dxR * dxR + dyD * dyD;
                PET +=
                    (rvs[i][j][0] - rD[0]) ** 2 + (rvs[i][j][2] - rD[2]) ** 2 +
                    (rvs[i][j][1] - rR[1]) ** 2 + (rvs[i][j][2] - rR[2]) ** 2;
            }
        }
        // Now include pre-factors (0.5 and/or spring constant) needed for energies.
        KE /= 2;
        PEk *= springConstant * kConst / 2;
        PET *= springConstant * T / 2;
        const PE = PET + PEk;
        const E = PE + KE;
        return [Fs, KE, PE, E];
    }
        // With the present phase-space coordinate ...
        // 1) ... finds the present generalized force,
        // 2) ... propagates through phase-space for a particular amount of time (= dt/m),
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
                        // Utilize a weighted average of the generalized forces.
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
        let { state, handleToggle, handleN, toggle, info } = this;
        let { n, rvs, velocityLength, accelerationLength, showBond, time, KE, PE, E, Ei } = state;
        return (
            <>
                <div className="container">
                    <div className="side">
                        <span>
                            How many particles should be along each edge?
                            <input
                                width="3"
                                type="number"
                                onChange={handleN}
                                placeholder="# of particles"
                                value={String(n)}
                                min="1"
                                max="50"
                                step="1"
                            />
                            <Button onClick={handleToggle} name="n" toggle={state.info.n} />
                        </span>
                        <div>
                            <i>{state.info.n ? info.n : null}</i>
                        </div>
                        <div className="controls">
                            <span className="button-container">
                                <button onClick={toggle}>
                                    {this.state.running ? "PAUSE" : "RUN"}
                                </button>
                            </span>
                            time: {Math.round(100 * time)/100} s
                        </div>
                        <Graph KE={KE} PE={PE} E={E} Ei={Ei} handleToggle={handleToggle}
                            toggle={state.info} info={this.info}
                        />
                        <div
                            className="drumContainer"
                            style={{
                                height: `${this.numPx}px`,
                                width: `${this.numPx}px`
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
                            handleToggle={handleToggle}
                            stateInfo={state.info}
                            thisInfo={this.info}
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
                            handleToggle={handleToggle}
                            toggle={state.info}
                            info={this.info}
                        />
                    </div>
                </div>
            </>
        )
    }
}

export default Drum;
