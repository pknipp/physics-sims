GENERAL:
* Make splash page which contains links to the various sims (asteroids, drumhead, planets)
* auth?

DRUMHEAD:
* connect objects with lines
* refactor Row component to use 6 Element components (3 x dx & 3 x vi)
* enable negative inputs for ICs
* figure out how to round #'s which are displayed in input boxes
* insert a "reset" button
* enable "speed" to be changed without first pausing sim
* auth
* center headings better in table
* put lefthand items in a ul
* highlight somehow those particles w/non-zero IC?
* increase order of integrator?
* figure out why styling sometimes doesn't work in jsx components
* figure out why I should not decrease dt below 5 ms
* insert arrows to indicate tangential velocity
* adjust IC by click-and-drag instead of form filling

ASTEROIDS:
* Allow two objects that "collide" (ie come within a certain distance of each other) to merge into a single object in a manner which conserves both mass (e.g., size) and momentum (= mass times velocity), and allow for the possibility that single objects may spontaneously split into two objects, again in a manner which conserved mass and momentum.

PLANETARY MOTION:
* 2-d motion of planets (using exact solution)
Stretch:
* make this 3-d
