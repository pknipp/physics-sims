import React from "react";
const Object = ({ X, Y, Z, X0, Y0, width, backgroundColor}) => {
    debugger
    // let size = Math.floor(numPx * width/(1 - Z));
    // let xpx = Math.floor(numPx * (X + 0.5));
    // let ypx = Math.floor(numPx * (Y + 0.5));
    let xpx0 = Math.floor(X0 - width/2);
    let ypx0 = Math.floor(Y0 - width/2);
    let size = Math.floor(width * ((Z < 0) ? 1/(1 - Z) : 1 + Z));
    let xpx = Math.floor(X - width/2);
    let ypx = Math.floor(Y - width/2);
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
