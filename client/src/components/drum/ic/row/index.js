import React from "react";
import Element from "./element/index";
import ChooseIndex from "./chooseIndex/index";
const Row = ({ optionsI, optionsJ, rvs, i, j, iIC, handleIndex, handleIC}) => {
    let row = [];
    for (let k = 0; k < 6; k++) {
        let element = (
            <Element
                key={k}
                k={k}
                rvs={rvs}
                i={i[iIC] - 1}
                j={j[iIC] - 1}
                handleIC={handleIC}
            />
        );
        row.push(element);
    }
    return (
        <tr>
            <ChooseIndex key={"selectJ"} options={optionsJ} name={`j${iIC}`} iorj={j[iIC]} handleIndex={handleIndex} />
            <ChooseIndex key={"selectI"} options={optionsI} name={`i${iIC}`} iorj={i[iIC]} handleIndex={handleIndex} />
            {(!i || !i[iIC] || !j || !j[iIC]) ? <td colSpan="6"></td> : row}
        </tr>
    )
}
export default Row;
