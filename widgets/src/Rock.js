import React from "react";
const Rock = ({ X, Y, Z, color }) => {
    debugger;
    let size = 1000/(100 - Z);
    debugger;
    return (size < 0) ? <div></div> : (
        <div className="dot" style={{
            height:`${size}px`,
            width:`${size}px`,
            left: `${X}px`,
            top: `${Y}px`,
            zIndex: `${Math.floor(Z)}`,
            backgroundColor: `${color}`
            }}>
        </div>
    )
}

export default Rock;
