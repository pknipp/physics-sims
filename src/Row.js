import React from "react";
const Row = ({ optionsI, optionsJ, rs, vs, i, j, iIC, handleIndex, handleDisp, handleVel }) => {
    debugger
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
                    value={i[iIC]   }
                >
                    {optionsI.map((option, col) => (
                        <option key={col} value={col}>
                            {option}
                        </option>
                    ))}
                </select>
            </td>
            <td>
                {(!i || !i[iIC] || !j || !j[iIC]) ? null : <input
                    type="number"
                    name={`x${iIC}`}
                    onChange={handleDisp}
                    value={String(rs[i[iIC] - 1][j[iIC] - 1][0])}
                />}
            </td>
            <td>
                {(!i || !i[iIC] || !j || !j[iIC]) ? null : <input
                    type="number"
                    name={`y${iIC}`}
                    onChange={handleDisp}
                    value={rs[i[iIC] - 1][j[iIC] - 1][1]}
                />}
            </td>
            <td>
                {(!i || !i[iIC] || !j || !j[iIC]) ? null : <input
                    type="number"
                    name={`z${iIC}`}
                    onChange={handleDisp}
                    value={rs[i[iIC] - 1][j[iIC] - 1][2]}
                />}
            </td>
            <td>
                {(!i || !i[iIC] || !j || !j[iIC]) ? null : <input
                    type="number"
                    name={`x${iIC}`}
                    onChange={handleVel}
                    value={String(vs[i[iIC] - 1][j[iIC] - 1][0])}
                />}
            </td>
            <td>
                {(!i || !i[iIC] || !j || !j[iIC]) ? null : <input
                    type="number"
                    name={`y${iIC}`}
                    onChange={handleVel}
                    value={vs[i[iIC] - 1][j[iIC] - 1][1]}
                />}
            </td>
            <td>
                {(!i || !i[iIC] || !j || !j[iIC]) ? null : <input
                    type="number"
                    name={`z${iIC}`}
                    onChange={handleVel}
                    value={vs[i[iIC] - 1][j[iIC] - 1][2]}
                />}
            </td>
        </tr>
    )
}

export default Row;
