import React from "react";

const Pixel = ({ i, j }) => {
    return (
        <Pixel className="pixel" style={{left: `${i * 50}px`, top: `${j * 50}px`,
        // backgroundColor: `rgb(${i*32}, ${j*32}, 0)`,
    }} />
    )
}

export default Pixel;
