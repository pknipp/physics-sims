import React from "react";
const Graph = ({KE, PE, E, Ei}) => {
    let Efac = (Ei) ? Ei : (PE) ? PE : 1;
    return (
        <div className="graph container">
            <div className="title">
                <h3>Energies (arbitrary units)</h3>
            </div>
            <div className="title ke">kinetic (KE)</div>
            <div className="title pe">potential (PE)</div>
            <div className="title tot">total (KE + PE)</div>
            <div className="title i">initial</div>
            <div className="val ke">
                {Math.floor(1000 * KE/Efac)/1000}
            </div>
            <div className="val pe">
                {Math.floor(1000 * PE/Efac)/1000}
            </div>
            <div className="val tot">
               {Math.floor(1000 * E/Efac)/1000}
            </div>
            <div className="val i">
               {Math.floor(1000 * Ei/Efac)/1000}
            </div>
            <div
                className="bar ke" style={{height:`${Math.floor(60 * KE/Efac)}px`}}>
            </div>
            <div
                className="bar pe" style={{height:`${Math.floor(60 * PE/Efac)}px`}}>
            </div>
            <div
                className="bar tot" style={{height:`${Math.floor(60 * E/Efac)}px`}}>
            </div>
            <div
                className="bar i" style={{height:`${Math.floor(60 * Ei/Efac)}px`}}>
            </div>
        </div>
    )
}

export default Graph;
