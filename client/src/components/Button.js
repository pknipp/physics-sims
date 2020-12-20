import React from "react";
import info from "./info.png";
import cancel from "./cancel.jpeg";
const Button = ({ onClick, name, toggle }) => {
    debugger
    return (
    <button
        className="info"
        onClick={onClick}
        name={name}
    >
        <img
            src={`${toggle ? cancel : info}`}
            alt={`do ${toggle ? "not" : ""} display info about this`} />
    </button>
)}
export default Button;
