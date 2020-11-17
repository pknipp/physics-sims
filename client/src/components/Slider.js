import React from "react";
const Slider = ({label, secondLine, minText, maxText, name,
    maxVal, stepSize, quantity, handler}) => (
    <>
        <tr rowSpan="2">
            <>
                <td>
                    {label}:
                </td>
                <td>
                    {minText}
                </td>
                <td>
                    <input
                        type="range"
                        onChange={handler}
                        name={`${name}`}
                        min="0"
                        max={`${maxVal}`}
                        step={`${stepSize}`}
                        value={quantity}
                    />
                </td>
                <td>
                    {maxText}
                </td>
            </>
        </tr>
        {(!secondLine) ? null : <tr>
            <td colSpan="4" align="left">
                ({secondLine})
            </td>
        </tr>}
    </>
)
export default Slider;
