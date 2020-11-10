import React from "react";
const Element = ({ rorv, k, rvs, i, j, handleIC }) => {
    return (
        <td>
            <input
                type="number"
                name={`${rorv}${i}${j}${k}`}
                onChange={handleIC}
                value={Math.floor(10000 * rvs[i][j][k]) / 10000}
            />
        </td>
    )
}

export default Element;
