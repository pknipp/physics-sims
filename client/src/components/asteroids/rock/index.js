import React from "react";
const Rock = ({ x, y, z, size, color, dt }) => {
    return (
    <div className="dot moving" style={{
        height:`${Math.round(size)}px`,
        width:`${Math.round(size)}px`,
        left: `${Math.round(x)}px`,
        top: `${Math.round(y)}px`,
        zIndex: `${Math.round(1000 * z)}`,
        backgroundColor: `${color}`,
        transitionDuration: `${1 * dt / 1000}s`,
        boxShadow:`0px 0px ${Math.round(0 * size/10)}px black`,
        }}>
    </div>
)}
export default Rock;
