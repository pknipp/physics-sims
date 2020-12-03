import React, {useState} from "react";

const Bond = ({x, y, z, x1, y1, width, size, dt}) => {
    const [angle, setAngle] = useState(0);
    if (x1 === null || y1 === null) return null;
    const dx = x1 - x;
    const dy = y1 - y;
    const r = Math.sqrt(dx * dx + dy * dy);
    let newAngle = Math.atan2(dy, dx) * 180 / Math.PI;
    if (newAngle !== angle) {
        if (dx < 0 && Math.cos(angle) < 0) {
            if (dy * Math.sin(angle) < 0) newAngle += (2 * Math.PI * ((dy > 0) ? 1 : -1));
        }
        setAngle(newAngle);
    }
    return (
        <div className="line bond" style={{
            width:`${r}px`,
            left: `${x - r / 2}px`,
            top: `${y}px`,
            transform: `rotate(${angle}deg) translateX(${r / 2}px)`,
            transitionDuration: `${dt / 1000}s`,
        }}/>
    )
}
export default Bond;
