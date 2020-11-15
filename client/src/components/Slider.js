import React from "react";
const Slider = ({speed, damping, logdt, dt, T, velocityLength,
    accelerationLength, bondThickness, handleInput, handleLogTimeStep}) => (
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
)
export default Slider;
