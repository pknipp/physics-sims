import React from "react";
const Element = ({ k, rvs, i, j, handleIC }) => {
    let quantity = rvs[i][j][k];
    return (
        <td>
            <input
                type="text"
                name={`${i}${j}${k}`}
                onChange={handleIC}
                value={typeof(quantity) === "string" ? quantity : Math.round(1000 * quantity) / 1000}
            />
        </td>
    )
}

export default Element;
