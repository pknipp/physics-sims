import React from "react";
import Pixel from "./Pixel";

const Pixels = () => {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            return <Pixel key={8 * i + j} i={i} j={j} />
        }
    }
}

export default Pixels;
