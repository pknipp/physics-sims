import React from "react";

const Bond = ({x, y, z, x1, y1, width, size, bondThickness}) => {
    if (x1 === null || y1 === null) return null;
    debugger
    const dx = x1 - x;
    const dy = y1 - y;
    const r = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    return (
        <div className="line bond" style={{
            width:`${r}px`,
            left: `${x - r / 2}px`,
            top: `${y}px`,
            borderWidth: `${bondThickness}px`,
            transform: `rotate(${angle}deg) translateX(${r / 2}px)`,
        }}/>
    )
}
export default Bond;
