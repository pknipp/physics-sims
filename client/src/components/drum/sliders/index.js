import React from "react";
import Slider from "./Slider";
const Sliders = ({speed, damping, logdt, dt, T, springConstant, velocityLength,
    accelerationLength, showBond, handleInput, handleLogdt, handleCheckbox, handleToggle,
    thisInfo, stateInfo }) => (
    <div className="slider">
        <h2>Simulation parameters:</h2>
        <table>
            <thead>
                <tr>
                    {/* <th colSpan="4" align="left"> Slider functionality</th> */}
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
                    // handleToggle={handleToggle}
                    // info={thisInfo.speed}
                    // toggle={stateInfo.speed}
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
                    handleToggle={handleToggle}
                    info={thisInfo.damping}
                    toggle={stateInfo.damping}
                />
                <Slider
                    key="logdt"
                    label='Timestep (logarithmic scale)'
                    secondLine={`Present value is ${dt} ms.`}
                    minText="1 ms"
                    maxText="1 s"
                    handler={handleLogdt}
                    name="logdt"
                    maxVal="3"
                    stepSize="0.15"
                    quantity={logdt}
                    handleToggle={handleToggle}
                    info={thisInfo.logdt}
                    toggle={stateInfo.logdt}
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
                    handleToggle={handleToggle}
                    info={thisInfo.T}
                    toggle={stateInfo.T}
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
                    handleToggle={handleToggle}
                    info={thisInfo.springConstant}
                    toggle={stateInfo.springConstant}
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
                    handleToggle={handleToggle}
                    info={thisInfo.velocityLength}
                    toggle={stateInfo.velocityLength}
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
                    handleToggle={handleToggle}
                    info={thisInfo.accelerationLength}
                    toggle={stateInfo.accelerationLength}
                />
                {/* <Slider key="bondThickness" label='Width of "bond" lines (black)' secondLine=""
                    minText="none" maxText="max" handler={handleInput} name="bondThickness"
                    maxVal="2" stepSize="1" quantity={bondThickness}/> */}
                <tr>
                    <td colSpan="2">Show "bond" between particles?</td>
                    <td>
                        <input
                            name="showBond"
                            type="checkbox"
                            checked={showBond}
                            onChange={handleCheckbox}
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
)
export default Sliders;
