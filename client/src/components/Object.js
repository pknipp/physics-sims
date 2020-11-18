import React from "react";
import Bond from "./Bond";
import Vector from "./Vector";
const Object = ({ X, Y, Z, XL, YL, XU, YU, XD, YD, XR, YR, Vx, Vy, Ax, Ay, X0, Y0, width, bondThickness, velocityLength, accelerationLength, backgroundColor}) => {
    let xpx0 = Math.round(X0 - width/2);
    let ypx0 = Math.round(Y0 - width/2);
    let size = Math.round(width * ((Z < 0) ? 1/(1 - Z) : 1 + Z));
    let xpx = Math.round(X - size/2);
    let ypx = Math.round(Y - size/2);
    return (
        <>
            <div className="dot moving" style={{
                height:`${size}px`,
                width:`${size}px`,
                left: `${xpx}px`,
                top: `${ypx}px`,
                zIndex: `${Math.round(1000 * Z)}`,
            }}/>

            <div className="dot stationary" style={{
                height:`${width}px`,
                width:`${width}px`,
                left:`${xpx0}px`,
                top:`${ypx0}px`,
            }}/>
            <Vector type={"velocity"} x={xpx + size / 2} y={ypx + size / 2} vec={[Vx, Vy]} fac={velocityLength} />
            <Vector type={"acceleration"} x={xpx + size / 2} y={ypx + size / 2} vec={[Ax, Ay]} fac={accelerationLength} />
            <Bond x={xpx + size / 2} y={ypx + size / 2} x1={XL} y1={YL} bondThickness={bondThickness} size={size}/>
            <Bond x={xpx + size / 2} y={ypx + size / 2} x1={XU} y1={YU} bondThickness={bondThickness} size={size}/>
            <Bond x={xpx + size / 2} y={ypx + size / 2} x1={XR} y1={YR} bondThickness={bondThickness} size={size}/>
            <Bond x={xpx + size / 2} y={ypx + size / 2} x1={XD} y1={YD} bondThickness={bondThickness} size={size}/>
        </>
    )
}

export default Object;
