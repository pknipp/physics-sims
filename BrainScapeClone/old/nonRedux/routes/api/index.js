const router = require('express').Router();
const routes = ['session', 'users', "classes", "decks", "cards"];
routes.forEach(route => router.use(`/${route}`, require(`./${route}`)));
module.exports = router;
