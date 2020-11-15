import React from "react";
const Sliders = ({speed, damping, logdt, dt, T, velocityLength,
    accelerationLength, bondThickness, handleInput, handleLogTimeStep}) => (
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
                            onChange={handleInput}
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
                            onChange={handleInput}
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
                            onChange={handleLogTimeStep}
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
                            onChange={handleInput}
                            name="T"
                            min="0"
                            max="1"
                            step="0.1"
                            value={T}
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
                            onChange={handleInput}
                            name="velocityLength"
                            min="0"
                            max="1"
                            step="0.1"
                            value={velocityLength}
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
                            onChange={handleInput}
                            name="accelerationLength"
                            min="0"
                            max="1"
                            step="0.1"
                            value={accelerationLength}
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
                            onChange={handleInput}
                            name="bondThickness"
                            min="0"
                            max="2"
                            step="1"
                            value={bondThickness}
                        />
                    </td>
                    <td>
                        max
                    </td>
                </tr>
            </tbody>
        </table>
        {/* <div>
            <input type="checkbox" id="velocity" checked={this.state.showVelname="showVel"      onChange={this.handleVector}/>
            <label htmlFor="velocity">Do you want to see each particle's velocitvector?</     label>
        </div> */}
    </div>
)
export default Sliders;
