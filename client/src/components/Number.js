import React from "react";
const Number = ({e, E, Efac}) => (
    <div className={`val ${e}`}>
       {Math.floor(1000 * E/Efac)/1000}
    </div>
)
export default Number;
