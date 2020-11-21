import React from "react";
const Rock = ({ x, y, z, size, color }) => (
    <div className="dot" style={{
        height:`${Math.round(size)}px`,
        width:`${Math.round(size)}px`,
        left: `${Math.round(x)}px`,
        top: `${Math.round(y)}px`,
        zIndex: `${Math.round(1000 * z)}`,
        backgroundColor: `${color}`
        }}>
    </div>
)
export default Rock;
