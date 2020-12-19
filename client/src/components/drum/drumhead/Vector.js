import React from "react";
const Vector = ({ type, x, y, vec, fac, dt }) => {
    // Pythagorean theorem
    let mag = fac * Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1])/2;
    // "TOA" part of "SOHCAHTOA"
    let angle = Math.atan2(vec[1], vec[0]) * 180 / Math.PI;
    return (
        <div className={`line ${type}`} style={{
                width:`${mag}px`,
                left: `${x - mag/2}px`,
                top: `${y}px`,
                transform: `rotate(${angle}deg) translateX(${mag/2}px)`,
        }}/>
    )
}
export default Vector;
