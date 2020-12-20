import React from "react";
import Row from "./row/index";
import Button from "../../Button";
const IC = ({nIC, i, j, n, optionsI, optionsJ, rvs, handleIndex, handleIC, handleInput, handleToggle, toggle, info}) => {
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
            <h2>
                <span>
                    Initial conditions:
                    <Button
                        onClick={handleToggle}
                        toggle={toggle.IC}
                        name="IC"
                    />
                </span>
            </h2>
            <div>
                <i>{toggle.IC ? info.IC : null}</i>
            </div>
            <span>
                Specify the number of particles to displace from equilibrium:
                <input
                    type="number"
                    name="nIC"
                    onChange={handleInput}
                    value={nIC}
                    min="0"
                    max={n * n}
                    step="1"
                />
                <Button
                    onClick={handleToggle}
                    toggle={toggle.nIC}
                    name="nIC"
                />
            </span>
            <div>
                <i>{toggle.nIC ? info.nIC : null}</i>
            </div>
            <table>
                <thead>
                    <tr>
                        <th colSpan="2" align="center">choose particle's</th>
                        <th colSpan="3">
                            displacement
                            <Button
                                onClick={handleToggle}
                                toggle={toggle.dx}
                                name="dx"
                            />
                        </th>
                        <th colSpan="3">
                            velocity
                            <Button
                                onClick={handleToggle}
                                toggle={toggle.v}
                                name="v"
                            />
                        </th>
                    </tr>
                    <tr>
                        <td colSpan="2"></td>
                        <td colSpan="3">
                            <i>{toggle.dx ? info.dx : null}</i>
                        </td>
                        <td colSpan="3">
                            <i>{toggle.v ? info.v : null}</i>
                        </td>
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
