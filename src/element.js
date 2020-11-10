import React from "react";
const Element = ({ rorv, k, rvs, i, j, handleIC }) => {
    return (
        <td>
            <input
                type="number"
                name={`${rorv}${i}${j}${k}`}
                onChange={handleIC}
                value={rvs[i][j][k]}
            />
        </td>
    )
}

export default Element;
