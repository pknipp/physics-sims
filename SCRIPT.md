* front: js/react/redux and back: js/express/sequelize
* timer based on setInterval (as in clock component of "widgets")
* object is simply a rounded box w/absolute positioning and dynamic styling
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
* nothing happens until object is displaced from "equilibrium" (initial conditions)
* demo running (1-d?) behavior w/nonzero IC (w/no v-vector or a-vector)
* boxes
* discuss simplicity of drawing angled lines w/css "transform" and SOHCAHTOA
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
* repeat above for circular motion
* show 3-d motion (later: show how z-index works better than canvas or svg)
* repeat above w/v-vector and a-vector (and then "turn off" the bonds?)
* show significance and utility of energy histogram
* show effect of damping
* show effect of timestep
* talk about accuracy = O(dt^n), for scientific computing
* demo for a larger grid of particles
