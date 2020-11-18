import React from "react";
const ChooseIndex = ({ options, name, iorj, handleIndex }) => {
    return (
        <td>
            <select
                onChange={handleIndex}
                name={`${name}`}
                value={iorj}
            >
                {options.map((option, index) => (
                    <option key={name} value={index}>
                        {option}
                    </option>
                ))}
            </select>
        </td>
    )
}

export default ChooseIndex;
