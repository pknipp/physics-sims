import React from "react";
const Object = ({ X, Y, Z, XL, YL, X0, Y0, width, backgroundColor}) => {
    let rL = Math.sqrt((X - XL) * (X - XL) + (Y - YL) * (Y - YL));
    let angle = Math.atan2(YL - Y, XL - X) * 180 /Math.PI;
    let xpx0 = Math.floor(X0 - width/2);
    let ypx0 = Math.floor(Y0 - width/2);
    let size = Math.floor(width * ((Z < 0) ? 1/(1 - Z) : 1 + Z));
    let xpx = Math.floor(X - size/2);
    let ypx = Math.floor(Y - size/2);
    debugger
    return (
        <>
            <div className="dot" style={{
                height:`${size}px`,
                width:`${size}px`,
                left: `${xpx}px`,
                top: `${ypx}px`,
                zIndex: `${Math.floor(1000 * Z)}`,
                backgroundColor: `${backgroundColor}`
            }}/>
            <div className="line" style={{
                width:`${rL}px`,
                left: `${xpx + size/2 - rL/2}px`,
                top: `${ypx + size/2}px`,
                zIndex: `${Math.floor(1000 * Z)}`,
                transform: `rotate(${angle}deg) translateX(${rL/2}px)`,
            }}/>

            <div className="dot stationary" style={{
                height:`${width}px`,
                width:`${width}px`,
                left:`${xpx0}px`,
                top:`${ypx0}px`,
                zIndex: 1000
                // backgroundColor: "green"
            }}/>
        </>
    )
}

export default Object;
