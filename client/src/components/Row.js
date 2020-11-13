import React from "react";
import Element from "./Element";
const Row = ({ optionsI, optionsJ, rvs, i, j, iIC, handleIndex, handleIC}) => {
    let row = [];
    for (let k = 0; k < 6; k++) {
        let element = (
            <Element
                key={k}
                k={k}
                rvs={rvs}
                i={i[iIC] - 1}
                j={j[iIC] - 1}
                handleIC={handleIC}
            />
        );
        row.push(element);
    }

    return (
        <tr>
            <td>
                <select
                    onChange={handleIndex}
                    name="j"
                    value={j[iIC]}
                >
                    {optionsJ.map((option, row) => (
                        <option key={row} value={row}>
                            {option}
                        </option>
                    ))}
                </select>
            </td>
            <td>
                <select
                    onChange={handleIndex}
                    name="i"
                    value={i[iIC]}
                >
                    {optionsI.map((option, col) => (
                        <option key={col} value={col}>
                            {option}
                        </option>
                    ))}
                </select>
            </td>
            {(!i || !i[iIC] || !j || !j[iIC]) ? <td colSpan="4"></td> : row}
        </tr>
    )
}

export default Row;
