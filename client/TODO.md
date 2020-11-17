GENERAL:
* Make splash page which contains links to the various sims (asteroids, drumhead, planets)
* auth?

DRUMHEAD:
* revise script for final presentation
* insert instructions (w/checkbox for whether or not to display?)
* insert default IC which'll essentially make instructions unnecessary
* readjust scaling for energies?
* ensure that user can only enter unique (i,j) combos for IC
* insert asteroids component to page reached after login
* insert CU for user (signup and edit details)
* change nested for-loops to nested list-comprehensions?
* consolitate column-choice and row-choice into a single component ("ChooseIndex"), thereby DRY-ing somewhat.
* use checkboxes (rather than sliders) for a- & v-arrows, along w/bond width?
* make it easier for user to enable negative inputs for ICs
* insert a "reset" button
* enable "speed" to be changed without first pausing sim?
* figure out why I should not decrease dt below 5 ms
* adjust IC by click-and-drag instead of form filling?

ASTEROIDS:
* Allow two objects that "collide" (ie come within a certain distance of each other) to merge into a single object in a manner which conserves both mass (e.g., size) and momentum (= mass times velocity), and allow for the possibility that single objects may spontaneously split into two objects, again in a manner which conserved mass and momentum.

PLANETARY MOTION:
* 2-d motion of planets (using exact solution)
Stretch:
* make this 3-d
