import React from "react";
const ChooseIndex = ({ options, name, iorj, handleIndex }) => {
    return (
        <td>
            <select
                key={`${name}`}
                onChange={handleIndex}
                name={`${name}`}
                value={iorj}
            >
                {options.map((option, index) => (
                    <option
                        key={`${name}${index}`}
                        value={index}>
                        {option}
                    </option>
                ))}
            </select>
        </td>
    )
}

export default ChooseIndex;
