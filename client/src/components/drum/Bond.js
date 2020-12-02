import React from "react";

const Bond = ({x, y, z, x1, y1, width, size, dt}) => {
    if (x1 === null || y1 === null) return null;
    // The following two lines represent the two sides of a right triangle.
    const dx = x1 - x;
    const dy = y1 - y;
    // Pythagorean theorem
    const r = Math.sqrt(dx * dx + dy * dy);
    // "TOA" part of "SOHCAHTOA"
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    return (
        <div className="line bond" style={{
            width:`${r}px`,
            left: `${x - r / 2}px`,
            top: `${y}px`,
            transform: `rotate(${angle}deg) translateX(${r / 2}px)`,
            // transitionDuration: `${dt / 1000}s`,
        }}/>
    )
}
export default Bond;
