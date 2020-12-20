import React from "react";
import Button from "../../Button";
const Slider = ({label, secondLine, minText, maxText, name,
    maxVal, stepSize, quantity, handler, handleToggle, info, toggle}) => (
    <>
        <tr rowSpan="2">
            <>
                <td>
                    {label}:
                </td>
                <td align="right">
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
                <td>
                    {!info ? null : <Button
                        onClick={handleToggle}
                        toggle={toggle}
                        name={name}
                    />}
                </td>
            </>
        </tr>
        {(!secondLine) ? null : <tr>
            <td colSpan="4" align="left">
                ({secondLine})
            </td>
        </tr>}
        {!info ? null : <tr>
            <td colSpan="5">
                <i>{toggle ? info : null}</i>
            </td>
        </tr>}
    </>
)
export default Slider;
