* Misc:
  * Uncomment validateLogin middleware in login route
* Administrative/clerical
  * Use VSCode to sanitize pojos in "RESTful API" docs.
  * Find a DRY way to manage information in "Back-end routes" and "RESTful API" (links?).
* General
  * Find a DRY way to store validation data such as min/max lengths of lastName.
  * Where is best place to validate password2: front, back, or both?
  * Slice off non-pojo parts (by using .dataValues key) of sqlz returns, as needed (e.g, for res.body).
  * Determine when/if some of the db-table columns and/or back-end routes should be trimmed.
* db
  * Generate seeder file for Histories table?
  * convert any of these other functions to instance methods in model files
  * seed some nonpublic classes (and decks and cards therefore)?
* routes
  * Understand considerations of whether data sent to back-end should go in params or in body
  * re-query routes so that res contains exactly what is needed: no more, no less
  * for putCardConfidence, determine if FindCreateFind could be used, and if null is needed
  * test deleteUser route some more
* index.js
  * change functions from declaration form to phat-arrow form
  * make 5 separate files, all imported by index.js
