import React from "react";
const Row = ({ rorv, k, rvs, i, j, handle }) => {
    debugger
    return (
        <td>
            <input
                type="number"
                name={`${rorv}${k}`}
                onChange={handle}
                value={rvs[i][j][k]}
            />}
        </td>
    )
}

export default Element;
