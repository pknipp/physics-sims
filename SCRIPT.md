1. front: js/react/redux and back: js/express/sequelize
1. dynamic styling: left (x), top (y), z-index/height/width (z), transform: rotate
1. math for styling: trig (SOHCAHTOA & pythagorean theorem)
1. math for dynamics: 4th-order Runge-Kutta integrator for differential equations
1. timer based on setInterval (as in clock component of "widgets")
```
// xpx, ypx, and Z are parts of state, and "size" is derived from Z
<div className="dot moving" style={{
                height:`${size}px`,
                width:`${size}px`,
                left: `${xpx}px`,
                top: `${ypx}px`,
                zIndex: `${Math.floor(1000 * Z)}`,
        }}/>
```
4. nothing happens until object is displaced from "equilibrium" (initial conditions)
1. demo running (1-d?) behavior w/nonzero IC (w/no v-vector or a-vector)
```
// basic trig required to get angled lines:
rR = Math.sqrt((X - XR) * (X - XR) + (Y - YR) * (Y - YR));  // Pythagorean theorem
angleR = Math.atan2(YR - Y, XR - X) * 180 / Math.PI;    // arctangent yields the angle (in radians)

<div className="line bond" style={{
                width:`${rR}px`,
                left: `${xpx + size/2 - rR/2}px`,
                top: `${ypx + size/2}px`,
                borderWidth: `${bondThickness}px`,
                transform: `rotate(${angleR}deg) translateX(${rR/2}px)`,
            }}/>
```
7. repeat above for circular motion
1. show 3-d motion (later: show how z-index works better than canvas or svg)
1. repeat above w/v-vector and a-vector (and then "turn off" the bonds?)
1. show significance and utility of energy histogram
1. show effect of damping
1. show effect of timestep
1. accuracy = O(dt^n), for scientific computing
1. demo for a larger grid of particles (w/reduced timestep)
1. note time-lagging (and speed-up when time-step is increased)
