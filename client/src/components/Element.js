import React from "react";
const Element = ({ k, rvs, i, j, handleIC }) => {
    return (
        <td>
            <input
                type="number"
                name={`${i}${j}${k}`}
                onChange={handleIC}
                value={Math.round(10000 * rvs[i][j][k]) / 10000}
            />
        </td>
    )
}

export default Element;
