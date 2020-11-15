import React from "react";
import Object from "./Object";

const Drumhead = ({n, xs, ys, rvs, Fs, velocityLength, accelerationLength, bondThickness, width}) => {
    let numPx = 540;
    let rComponents = (
        xs.map((x, i) => {
            return ys.map((y, j) => {
                let X0 = numPx * (x + 0.5);
                let Y0 = numPx * (y + 0.5);
                let X = X0 + numPx * rvs[i][j][0];
                let Y = Y0 + numPx * rvs[i][j][1];
    // coefficients on following 4 lines are not that crucial
                let Vx = 3 * numPx * rvs[i][j][3]/1;
                let Vy = 3 * numPx * rvs[i][j][4]/1;
                let Ax = 3 * numPx * Fs[i][j][3]/1/1;
                let Ay = 3 * numPx * Fs[i][j][4]/1/1;
                let XL;
                let YL;
                let XU;
                let YU;
                if (i === 0) {
                    XL = 0;
                    YL = numPx * (y + 0.5)
                } else {
                    XL = numPx * (xs[i - 1] + 0.5 + rvs[i - 1][j][0]);
                    YL = numPx * (y + 0.5 + rvs[i - 1][j][1]);
                }
                if (j === 0) {
                    YU = 0;
                    XU = numPx * (x + 0.5)
                } else {
                    XU = numPx * (x + 0.5 + rvs[i][j - 1][0]);
                    YU = numPx * (ys[j - 1] + 0.5 + rvs[i][j - 1][1]);
                }
                return (
                    <div key={n * i + j}>
                        <Object
                            X0={X0}
                            Y0={Y0}
                            X={X}
                            Y={Y}
                            Z={rvs[i][j][2]}
                            XL={XL}
                            YL={YL}
                            XU={XU}
                            YU={YU}
                            XD={(j === n - 1) ? numPx * (x + 0.5): null}
                            YD={(j === n - 1) ? numPx: null}
                            XR={(i === n - 1) ? numPx: null}
                            YR={(i === n - 1) ? numPx * (y + 0.5): null}
                            Vx={Vx}
                            Vy={Vy}
                            Ax={Ax}
                            Ay={Ay}
                            bondThickness={bondThickness}
                            velocityLength={velocityLength}
                            accelerationLength={accelerationLength}
                            width={numPx * width}
                        />
                    </div>
                )
            })
        })
    )
    return rComponents;
}

export default Drumhead;
