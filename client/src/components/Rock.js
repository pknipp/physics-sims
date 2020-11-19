import React from "react";
const Rock = ({ X, Y, Z, color }) => {
    let size = 10/(1 - Z);
    let xpx = Math.round(1400 * (X + 0.5));
    let ypx = Math.round(660 * (Y + 0.5));
    return (size < 0 || Math.abs(X) > 0.5 || Math.abs(Y) > 0.5) ? null : (
        <div className="dot" style={{
            height:`${size}px`,
            width:`${size}px`,
            left: `${xpx}px`,
            top: `${ypx}px`,
            zIndex: `${Math.round(1000 * Z)}`,
            backgroundColor: `${color}`
            }}>
        </div>
    )
}

export default Rock;
