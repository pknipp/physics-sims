'use strict';
const faker = require("faker");
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Classes', [
{quality: 0.5+Math.floor(10*Math.random())/2, description: faker.lorem.sentence(), name:"Aeronautics"},
{quality: 0.5+Math.floor(10*Math.random())/2, description: faker.lorem.sentence(), name:"Algebra"},
{quality: 0.5+Math.floor(10*Math.random())/2, description: faker.lorem.sentence(), name:"Archaeology"},
{quality: 0.5+Math.floor(10*Math.random())/2, description: faker.lorem.sentence(), name:"Art"},
{quality: 0.5+Math.floor(10*Math.random())/2, description: faker.lorem.sentence(), name:"Astrology"},
{quality: 0.5+Math.floor(10*Math.random())/2, description: faker.lorem.sentence(), name:"Astronomy"},
{quality: 0.5+Math.floor(10*Math.random())/2, description: faker.lorem.sentence(), name:"Biology"},
{quality: 0.5+Math.floor(10*Math.random())/2, description: faker.lorem.sentence(), name:"Botany"},
{quality: 0.5+Math.floor(10*Math.random())/2, description: faker.lorem.sentence(), name:"Chemisty"},
{quality: 0.5+Math.floor(10*Math.random())/2, description: faker.lorem.sentence(), name:"Dance"},
{quality: 0.5+Math.floor(10*Math.random())/2, description: faker.lorem.sentence(), name:"Earth Science"},
{quality: 0.5+Math.floor(10*Math.random())/2, description: faker.lorem.sentence(), name:"Egyptology"},
{quality: 0.5+Math.floor(10*Math.random())/2, description: faker.lorem.sentence(), name:"Engineering"},
{quality: 0.5+Math.floor(10*Math.random())/2, description: faker.lorem.sentence(), name:"French"},
{quality: 0.5+Math.floor(10*Math.random())/2, description: faker.lorem.sentence(), name:"Geography"},
{quality: 0.5+Math.floor(10*Math.random())/2, description: faker.lorem.sentence(), name:"Geology"},
{quality: 0.5+Math.floor(10*Math.random())/2, description: faker.lorem.sentence(), name:"Geometry"},
{quality: 0.5+Math.floor(10*Math.random())/2, description: faker.lorem.sentence(), name:"German"},
{quality: 0.5+Math.floor(10*Math.random())/2, description: faker.lorem.sentence(), name:"Heiroglyphics"},
{quality: 0.5+Math.floor(10*Math.random())/2, description: faker.lorem.sentence(), name:"History"},
{quality: 0.5+Math.floor(10*Math.random())/2, description: faker.lorem.sentence(), name:"Italian"},
{quality: 0.5+Math.floor(10*Math.random())/2, description: faker.lorem.sentence(), name:"Karate"},
{quality: 0.5+Math.floor(10*Math.random())/2, description: faker.lorem.sentence(), name:"Latin"},
{quality: 0.5+Math.floor(10*Math.random())/2, description: faker.lorem.sentence(), name:"Music"},
{quality: 0.5+Math.floor(10*Math.random())/2, description: faker.lorem.sentence(), name:"Physics"},
{quality: 0.5+Math.floor(10*Math.random())/2, description: faker.lorem.sentence(), name:"Portuguese"},
{quality: 0.5+Math.floor(10*Math.random())/2, description: faker.lorem.sentence(), name:"Russian"},
{quality: 0.5+Math.floor(10*Math.random())/2, description: faker.lorem.sentence(), name:"Spanish"}
    ], {});
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Classes', null, {})
};
