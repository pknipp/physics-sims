GENERAL:
* In the Signup route, prevent a new user from selecting an email which has already been taken.
* Style "splash" page
* Style landing page which contains links to the various sims (asteroids, drumhead, heat equation)
* format createdAt output in a more friendly manner

DRUMHEAD:
* make each particle an instance of an Particle class
* figure out how to use transitions on properties which utilize atan
* insert instructions (w/checkbox for whether or not to display?)
* break down some components?
* readjust scaling for energies?
* ensure that user can only enter unique (i,j) combos for IC
* insert U for user (edit details)
* make it easier for user to enable negative inputs for ICs
* insert a "reset" button
* enable "speed" to be changed without first pausing sim?
* adjust IC by click-and-drag instead of form filling?

HEAT EQUATION:
* Provide more instructions and explanation as to how to use the sim.
* determine if a factor of 2 is needed, because of 2-step average that is taken
* insert outgoing BC (for which green's function should be used, or modified BC)?
* add any heat sources?

ASTEROIDS:
* Allow two objects that "collide" (ie come within a certain distance of each other) to merge into a single object in a manner which conserves both mass (e.g., size) and momentum (= mass times velocity), and allow for the possibility that single objects may spontaneously split into two objects, again in a manner which conserved mass and momentum.

PLANETARY MOTION:
* 2-d motion of planets (using exact solution)
Stretch:
* make this 3-d

VIBRATING BEAM:
* display either horizontally or vertically
* choose which BC to zero: (1) y & y', (2) y & y'', etc
* unforced oscillations: how to displace it initially (at end?)
* forced oscillations: displacement at end, rotation at end, uniformly along length?, all w/damping?

EULER's TORQUE-FREE motion:
* 3-d rendering of a rectangular parallelipiped w/a stationary mass-center

COLLISIONS:
* tunable coefficient of restitution (e)
* during each timestep, determine if there'll be a collision, and which'll be the first one (work from there)
* each timestep involves a large array of line segments, SOME of which intersect
* determine the earliest point of any of these intersection, enforce this collision, and then find the next collision
* 1-d, 2-d, and 3-d

VIBRATING STRING:
* 1-d version of Drumhead
