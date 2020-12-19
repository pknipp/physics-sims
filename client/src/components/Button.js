import React from "react";
const Button = ({ onClick, name, toggle }) => {
    return (
    <button
        onClick={onClick}
        name={name}
    >
        {`${toggle ? "Hide" : "Show"} ${name}`}
    </button>
)}
export default Button;
