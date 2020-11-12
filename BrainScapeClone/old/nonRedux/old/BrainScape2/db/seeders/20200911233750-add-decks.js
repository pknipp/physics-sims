'use strict';
const faker = require("faker");
const classIdMin = 1;
const classIdMax = 28;
const dClassId = 1 + classIdMax - classIdMin;
const decksPerClass = 4;
const decks = [];
for (let i = 0; i < dClassId * decksPerClass; i++) {
  decks.push({classId: classIdMin + Math.floor(dClassId * Math.random()), name: faker.lorem.word(), objective: faker.lorem.sentence()})
}
module.exports = {
  up:   (queryInterface, Sequelize) => queryInterface.bulkInsert('Decks', decks,{}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Decks', null, {})
};
