import React from "react";

const Bond = ({x, y, r, bondThickness}) => {
    debugger
    return (
        <div className="line bond" style={{
            width:`${rL}px`,
            left: `${xpx + size/2 - rL/2}px`,
            top: `${ypx + size/2}px`,
            borderWidth: `${bondThickness}px`,
            transform: `rotate(${angleL}deg) translateX(${rL/2}px)`,
        }}/>
    )
}

export default Bond;
