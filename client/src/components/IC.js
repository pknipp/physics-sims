import React from "react";
import Row from "./Row";
const IC = ({nIC, i, j, n, optionsI, optionsJ, rvs, handleIndex, handleIC, handleInput}) => {
    let Rows = [];
    for (let iIC = 0; iIC < nIC; iIC++) {
        Rows.push(
            <Row
                key={iIC}
                optionsI={optionsI}
                optionsJ={optionsJ}
                rvs={rvs}
                i={i}
                j={j}
                iIC={iIC}
                handleIndex={handleIndex}
                handleIC={handleIC}
            />
        )
    }
    return (
        <>
            <h2>Initial conditions:</h2>
            <span>
                Specify the number of particles that you'll displace from equilibrium.
            </span>
            <form>
                <label htmlFor="nIC">number = </label>
                <input
                    type="number"
                    name="nIC"
                    onChange={handleInput}
                    value={nIC}
                    min="0"
                    max={n * n}
                    step="1"
                />
            </form>
            <table>
                <thead>
                    <tr>
                        <th colSpan="2" align="center">choose particle's</th>
                        <th colSpan="3">displacement</th>
                        <th colSpan="3">velocity</th>
                    </tr>
                    <tr>
                        <td colSpan="2">row and column</td>
                        <td align="center">x</td><td align="center">y</td><td align="center">z</td>
                        <td align="center">x</td><td align="center">y</td><td align="center">z</td>
                    </tr>
                </thead>
                <tbody>
                    {Rows}
                </tbody>
            </table>
        </>
    );
}

export default IC;
