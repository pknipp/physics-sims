GENERAL:
* Make splash page which contains links to the various sims (asteroids, drumhead, planets)
* auth?

DRUMHEAD:
* make a script for presentation
* consolidate position stuff and velocity stuff into a single variable (e.g., rs & vs -> rvs)
* increase order of integrator (if/when the previous step is done)?
* consolitate column-choice and row-choice into a single component ("ChooseIndex"), thereby DRY-ing somewhat.
* use checkboxes (rather than sliders) for a- & v-arrows, along w/bond width?
* make it easier for user to enable negative inputs for ICs
* insert a "reset" button
* enable "speed" to be changed without first pausing sim?
* auth
* figure out why I should not decrease dt below 5 ms
* adjust IC by click-and-drag instead of form filling?

ASTEROIDS:
* Allow two objects that "collide" (ie come within a certain distance of each other) to merge into a single object in a manner which conserves both mass (e.g., size) and momentum (= mass times velocity), and allow for the possibility that single objects may spontaneously split into two objects, again in a manner which conserved mass and momentum.

PLANETARY MOTION:
* 2-d motion of planets (using exact solution)
Stretch:
* make this 3-d
