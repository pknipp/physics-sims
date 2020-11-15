import React from "react";
import Slider from "./Slider";
const Sliders = ({speed, damping, logdt, dt, T, springConstant, velocityLength,
    accelerationLength, bondThickness, handleInput, handleLogdt}) => (
    <div className="slider">
        <h2>Simulation parameters:</h2>
        <table>
            <thead>
                <tr>
                    <th colSpan="4" align="left"> Slider functionality</th>
                </tr>
            </thead>
            <tbody>
                <Slider
                    key="speed"
                    label="Simulation speed"
                    secondLine="Pause/Run before change takes effect."
                    minText="slow"
                    maxText="regular"
                    handler={handleInput}
                    name="speed"
                    maxVal="1"
                    stepSize="0.1"
                    quantity={speed}
                />
                <Slider
                    key="damping"
                    label='Damping (or "viscosity")'
                    secondLine=""
                    minText="none"
                    maxText="much"
                    handler={handleInput}
                    name="damping"
                    maxVal="2"
                    stepSize="0.2"
                    quantity={damping}
                />
                <Slider
                    key="logdt"
                    label='Time-step (logarithmic scale)'
                    secondLine={`Present value is ${dt} ms.`}
                    minText="1 ms"
                    maxText="1 s"
                    handler={handleLogdt}
                    name="logdt"
                    maxVal="3"
                    stepSize="0.15"
                    quantity={logdt}
                />
                <Slider
                    key="T"
                    label="Type of restoring force"
                    secondLine=""
                    minText="spring-like"
                    maxText="tension-like"
                    handler={handleInput}
                    name="T"
                    maxVal="1"
                    stepSize="0.1"
                    quantity={T}
                />
                <Slider
                    key="springConstant"
                    label='"Stiffness" of restoring force'
                    secondLine=""
                    minText="nonexistent"
                    maxText="stiff"
                    handler={handleInput}
                    name="springConstant"
                    maxVal="2"
                    stepSize="0.2"
                    quantity={springConstant}
                />
                <Slider
                    key="velocityLength"
                    label="Length of velocity arrow (green dotted)"
                    secondLine=""
                    minText="none"
                    maxText="max"
                    handler={handleInput}
                    name="velocityLength"
                    maxVal="1"
                    stepSize="0.1"
                    quantity={velocityLength}
                />
                <Slider
                    key="accelerationLength"
                    label="Length of accceleration arrow (red)"
                    secondLine=""
                    minText="none"
                    maxText="max"
                    handler={handleInput}
                    name="accelerationLength"
                    maxVal="1"
                    stepSize="0.1"
                    quantity={accelerationLength}
                />
                <Slider
                    key="bondThickness"
                    label='Width of "bond" lines (black)'
                    secondLine=""
                    minText="none"
                    maxText="max"
                    handler={handleInput}
                    name="bondThickness"
                    maxVal="2"
                    stepSize="1"
                    quantity={bondThickness}
                />
            </tbody>
        </table>
        {/* <div>
            <input type="checkbox" id="velocity" checked={this.state.showVelname="showVel"      onChange={this.handleVector}/>
            <label htmlFor="velocity">Do you want to see each particle's velocitvector?</     label>
        </div> */}
    </div>
)
export default Sliders;
