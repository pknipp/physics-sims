This project will simulate the visualization of a collection of objects each of which is ...
* represented as a simple 2-dimensional shape (such as a square),
* resides a 3-dimensional space (ie, x, y, z) in which (x, y) = (0, 0) defines the viewer's fixation point,
and z equals the distance between the viewer and the (x,y)-plane occupied by the object,
* moves with a constant velocity, and
* starts from a location which is far from the viewer.

The collection of objects will be visualized as if if they are viewed via a narrow viewing cone, in which case the object's position (and lateral size) will be represented on a 2-dimensional viewport (ie, X and Y) such that X is proportional to x/z and Y is proportional to y/z (ie, closer objects appear larger) and the Z-index of each object will equal -1 times the z-position (ie, closer objects will obscure those which are farther away).

The motion will be handled by React life-cycle methods, and the positionning will be handled via css.

Project mileposts:
* one object moving along a tangential path (ie, across the screen)
* one object moving towards the viewer along the z-axis
* one object moving along a path parallel to the z-axis (but not coincident with it)
* one object moving along an oblique path (ie, neither of the previous three cases)
* two objects moving along tangential paths and which overlap momentarily
* two objects moving along the z-axis and which momentarily occupy the same position
* many objects which follow uncorrelated oblique paths/
As one object moves outside of the viewing cone, another will be created far away with a random velocity and position, thereby giving the impression that the viewer is moving in a spaceship thru an endless field of asteroids (reminiscent of a 1990's era MS-Windows screensaver)

Stretch goals:
* Allow two objects that "collide" (ie come within a certain distance of each other) to merge into a single object in a manner which conserves both mass (e.g., size) and momentum (= mass times velocity), and allow for the possibility that single objects may spontaneously split into two objects, again in a manner which conserved mass and momentum.
* Create a 2-dimensional array of objects, each of which is connected its nearest neighbor by a harmonic restoring force.  As an object moves out of the plane of this array, it exerts forces on its neighbors, thereby causing a wave motion to move across the surface.  The motion of this wave will be rendered in the same manner as the motion of the objects in the previous part, in that closer objects will appear larger.
