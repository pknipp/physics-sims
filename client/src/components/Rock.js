import React from "react";
const Rock = ({ X, Y, Z, color }) => {
    let size = 10/(1 - Z);
    let xpx = X //Math.round(1400 * (X + 0.5));
    let ypx = Y //Math.round(660 * (Y + 0.5));
    // return (size < 0 || Math.abs(X) > 0.5 || Math.abs(Y) > 0.5) ? null : (
        return (
        <div className="dot" style={{
            height:`${Math.round(size)}px`,
            width:`${Math.round(size)}px`,
            left: `${Math.round(xpx)}px`,
            top: `${Math.round(ypx)}px`,
            zIndex: `${Math.round(1000 * Z)}`,
            backgroundColor: `${color}`
            }}>
        </div>
    )
}

export default Rock;
