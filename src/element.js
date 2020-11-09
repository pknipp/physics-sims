import React from "react";
const Element = ({ rorv, k, rvs, i, j, handleIC }) => {
    debugger
    return (
        <td>
            <input
                type="number"
                name={`${rorv}${i}${j}${k}`}
                onChange={handleIC}
                value={Math.floor(1000*rvs[i][j][k])/1000}
            />
        </td>
    )
}

export default Element;
