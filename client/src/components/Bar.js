import React from "react";
const Bar = ({e, E, Efac}) => (
    <div
        className={`bar ${e}`} style={{height:`${Math.round(60 * E/Efac)}px`}}>
    </div>
)
export default Bar;
