import React from "react";
const Object = ({ X, Y, Z, XL, YL, XU, YU, XD, YD, XR, YR, Vx, Vy, Ax, Ay, X0, Y0, width, bondThickness, velocityLength, accelerationLength, backgroundColor}) => {
    let rL = Math.sqrt((X - XL) * (X - XL) + (Y - YL) * (Y - YL));
    let rU = Math.sqrt((X - XU) * (X - XU) + (Y - YU) * (Y - YU));
    let rD;
    let rR;
    let V = velocityLength     * Math.sqrt(Vx * Vx + Vy * Vy)/2;
    let A = accelerationLength * Math.sqrt(Ax * Ax + Ay * Ay)/2;
    let angleV = Math.atan2(Vy, Vx) * 180 / Math.PI;
    let angleA = Math.atan2(Ay, Ax) * 180 / Math.PI;
    let angleD;
    let angleR;
    if (XD) {
        rD = Math.sqrt((X - XD) * (X - XD) + (Y - YD) * (Y - YD));
        angleD = Math.atan2(YD - Y, XD - X) * 180 / Math.PI;
    }
    if (XR) {
        rR = Math.sqrt((X - XR) * (X - XR) + (Y - YR) * (Y - YR));
        angleR = Math.atan2(YR - Y, XR - X) * 180 / Math.PI;
    }
    let angleL = Math.atan2(YL - Y, XL - X) * 180 / Math.PI;
    let angleU = Math.atan2(YU - Y, XU - X) * 180 / Math.PI;
    let xpx0 = Math.floor(X0 - width/2);
    let ypx0 = Math.floor(Y0 - width/2);
    let size = Math.floor(width * ((Z < 0) ? 1/(1 - Z) : 1 + Z));
    let xpx = Math.floor(X - size/2);
    let ypx = Math.floor(Y - size/2);
    return (
        <>
            <div className="dot moving" style={{
                height:`${size}px`,
                width:`${size}px`,
                left: `${xpx}px`,
                top: `${ypx}px`,
                zIndex: `${Math.floor(1000 * Z)}`,
            }}/>

            <div className="dot stationary" style={{
                height:`${width}px`,
                width:`${width}px`,
                left:`${xpx0}px`,
                top:`${ypx0}px`,
            }}/>

            <div className="line velocity" style={{
                height:`${{size}}px`,
                width:`${V}px`,
                left: `${xpx + size/2 - V/2}px`,
                top: `${ypx + size/2}px`,
                transform: `rotate(${angleV}deg) translateX(${V/2}px)`,
            }}/>

            <div className="line acceleration" style={{
                height:`${{size}}px`,
                width:`${A}px`,
                left: `${xpx + size/2 - A/2}px`,
                top: `${ypx + size/2}px`,
                transform: `rotate(${angleA}deg) translateX(${A/2}px)`,
            }}/>

            <div className="line bond" style={{
                width:`${rL}px`,
                left: `${xpx + size/2 - rL/2}px`,
                top: `${ypx + size/2}px`,
                borderWidth: `${bondThickness}px`,
                transform: `rotate(${angleL}deg) translateX(${rL/2}px)`,
            }}/>

            {(!XR) ? null : <div className="line bond" style={{
                width:`${rR}px`,
                left: `${xpx + size/2 - rR/2}px`,
                top: `${ypx + size/2}px`,
                borderWidth: `${bondThickness}px`,
                transform: `rotate(${angleR}deg) translateX(${rR/2}px)`,
            }}/>}

            <div className="line bond" style={{
                width:`${rU}px`,
                left: `${xpx + size/2 - rU/2}px`,
                top: `${ypx + size/2}px`,
                borderWidth: `${bondThickness}px`,
                transform: `rotate(${angleU}deg) translateX(${rU/2}px)`,
            }}/>

            {(!XD) ? null : <div className="line bond" style={{
                width:`${rD}px`,
                left: `${xpx + size/2 - rD/2}px`,
                top: `${ypx + size/2}px`,
                borderWidth: `${bondThickness}px`,
                transform: `rotate(${angleD}deg) translateX(${rD/2}px)`,
            }}/>}

        </>
    )
}

export default Object;