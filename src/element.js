import React from "react";
const Element = ({ rorv, k, rvs, i, j, handle }) => {
    debugger
    return (
        <td>
            <input
                type="number"
                name={`${rorv}${i}${j}${k}`}
                onChange={handle}
                value={rvs[i][j][k]}
            />
        </td>
    )
}

export default Element;
