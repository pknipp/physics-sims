'use strict';
const faker = require("faker");
const deckIdMin = 1;
const deckIdMax = 64;
const dDeckId = deckIdMax - deckIdMin;
const cardsPerDeck = 10;
const cards = [];
for (let i = 0; i < cardsPerDeck * dDeckId; i++) {
  cards.push({deckId: deckIdMin + Math.floor(dDeckId * Math.random()), question: faker.lorem.sentence(), answer: faker.lorem.sentence()});
}
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Cards', cards, {}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Cards', null, {})
};
