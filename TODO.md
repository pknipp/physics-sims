GENERAL:
* Make splash page which contains links to the various sims (asteroids, drumhead, planets)
* auth?

DRUMHEAD:
* consolidate position stuff and velocity stuff into a single variable (e.g., rs & vs -> rvs)
* reduce vertical extent of controls (and timer?) at the top, perhaps using grid?
* flexbox this, w/n-input, start button, timer, energy, and drum on left and sliders & IC on right
* consolitate column-choice and row-choice into a single component ("ChooseIndex"), thereby DRY-ing somewhat.
* use checkboxes (rather than sliders) for a- & v-arrows, along w/bond width?
* make bar graph for PE & KE, and/or for energy partitioned by rows or columns?
* enable negative inputs for ICs
* insert a "reset" button
* enable "speed" to be changed without first pausing sim
* auth
* increase order of integrator?
* figure out why styling sometimes doesn't work in jsx components
* figure out why I should not decrease dt below 5 ms
* adjust IC by click-and-drag instead of form filling

ASTEROIDS:
* Allow two objects that "collide" (ie come within a certain distance of each other) to merge into a single object in a manner which conserves both mass (e.g., size) and momentum (= mass times velocity), and allow for the possibility that single objects may spontaneously split into two objects, again in a manner which conserved mass and momentum.

PLANETARY MOTION:
* 2-d motion of planets (using exact solution)
Stretch:
* make this 3-d
