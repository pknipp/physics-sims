import React from "react";
const Object = ({ X, Y, Z, X0, Y0, nx, ny, width, backgroundColor}) => {
    debugger
    let numPx = 550;
    // let size = Math.floor(numPx * width/(1 - Z));
    // let xpx = Math.floor(numPx * (X + 0.5));
    // let ypx = Math.floor(numPx * (Y + 0.5));
    let size0 = numPx * width;
    let xpx0 = Math.floor(numPx * (X0 + 0.5) - size0/2);
    let ypx0 = Math.floor(numPx * (Y0 + 0.5) - size0/2);
    let size = Math.floor(size0 * ((Z < 0) ? 1/(1 - Z) : 1 + Z));
    let xpx = Math.floor(numPx * (X + 0.5) - size/2);
    let ypx = Math.floor(numPx * (Y + 0.5) - size/2);
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
            <div className="dot stationary" style={{
                height:`${size0}px`,
                width:`${size0}px`,
                left:`${xpx0}px`,
                top:`${ypx0}px`,
                zIndex: 1000
                // backgroundColor: "green"
            }}/>
        </>
    )
}

export default Object;
