import React from "react";
const Element = ({ k, rvs, i, j, handleIC }) => {
    return (
        <td>
            <input
                type="number"
                name={`${i}${j}${k}`}
                onChange={handleIC}
                value={Math.round(1000 * rvs[i][j][k]) / 1000}
            />
        </td>
    )
}

export default Element;
