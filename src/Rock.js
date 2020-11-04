import React from "react";
const Rock = ({ X, Y, Z }) => {
    let size = 100/(1 - Z);
    let xpx = Math.floor(1000 * (X + 0.5));
    let ypx = Math.floor(560 * (Y + 0.5));
    return (
        <div className="dot" style={{
            height:`${size}px`,
            width:`${size}px`,
            left: `${xpx}px`,
            top: `${ypx}px`,
            zIndex: `${Math.floor(1000 * Z)}`,
            backgroundColor: "black"
            }}>
        </div>
    )
}

export default Rock;
