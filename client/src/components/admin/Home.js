import React from "react";
import { NavLink } from "react-router-dom";
import info from "../info.png";
import cancel from "../cancel.jpeg";
const Home = _ => {
    return (
    <div>
        <div className="welcome">
            <p> We live in a universe that obeys the laws of physics.</p>
            <p>  These animations demonstrate some of these.</p>
            <p> Enjoy learning about our universe!</p>
        </div>
        <ul className="descriptions">
            <li> A <NavLink to="/drum"> vibrating drumhead </NavLink> consists of many atoms which are connected by bonds.  The motion of one atom will cause its "neighbor" to move because of the force created by the bond that connects them.  The law which governs such motion is Newton's 2nd law, which says that if a force <i>F</i> is exerted on a particle whose mass equals <i>m</i>, then that particle will accelerate.  The particle's resulting acceleration <i>a</i> is related to the other two quantities by the "ordinary differential equation" <i>F</i> = <i>ma</i>.  (Expressed in calculus terms  this equation is <i>F</i> = <i>mx<sub>tt</sub></i>, where <i>x<sub>tt</sub></i> is the second derivative of the particle's position <i>x</i> with respect to the time <i>t</i>.) For this simulation I solve that equation in order to produce the simultaneous motion of all of the particles which constitute the head of the drum.  Adjust the system's size, "initial conditions", and other parameters in order to see how it behaves.
            </li>

            <li> The <NavLink to="/heat">"heat equation"</NavLink> describes how heat flows through an object.  For instance if an object's right side touches a warm object while the object's left side touches a cooler object, the resulting temperature <i>T</i> at different parts of the object will steadily decrease from its right end to its left end.  Also, if one part of the object is suddenly heated up or cooled down relative to adjacent parts of the object, that part of the object will exchange heat with its neighboring parts so that eventually the entire object will return to "thermal equilibrium".  The heat equation is written in terms of derivatives: <i>T<sub>t</sub></i> = &alpha;<i>T<sub>xx</sub></i>, in which <i>T<sub>t</sub></i> is the first derivative ("rate of change") of the temperature at a position in the object, <i>T<sub>xx</sub></i> is the second derivative of <i>T</i> with respect to varying the position <i>x</i>, and &alpha; is the object's "thermal diffusivity", which is proportional to how quickly heat spreads out in an object.  This is an example of a "partial differential equation".  Click-and-drag in order to create arbitrary initial conditions for this system, and watch what happens when you run the animation.
            </li>

            <li> <NavLink to="/asteroids">Asteroid field</NavLink> is the last animation. In this there is not much for you to do except to sit back and enjoy what it would feel like to travel thru space.  Be aware of any near misses!</li>
        </ul>
        Note: in these animations click "<img src={info} alt="Show information." />/<img src={cancel} alt="Hide information." />" in order to toggle the display of information about various details, and click "<button disabled>RUN</button>/<button disabled>PAUSE</button>" in order to toggle the animation on/off.
    </div>
)}
export default Home;
