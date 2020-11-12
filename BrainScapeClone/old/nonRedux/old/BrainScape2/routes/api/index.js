const router = require('express').Router();

const routes = ['csrf', 'session', 'users', "classes", "decks", "cards"];

for (let route of routes) {
  router.use(`/${route}`, require(`./${route}`));
}

module.exports = router;
