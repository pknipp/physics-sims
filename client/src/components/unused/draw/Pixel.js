import React from "react";

const Pixel = ({ i, j }) => {
    return (
        <div className="pixel" style={{left: `${i * 10}px`, top: `${j * 10}px`,
        backgroundColor: `rgb(${i*6}, ${j*6}, 0)`, zIndex: -1,
    }}>
        </div>
    )
}

export default Pixel;
