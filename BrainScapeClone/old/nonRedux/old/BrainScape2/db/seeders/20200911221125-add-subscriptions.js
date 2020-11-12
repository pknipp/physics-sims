'use strict';
const userIdMin = 1;
const userIdMax = 2;
const dUserId = userIdMax - userIdMin;
const classIdMin = 1;
const classIdMax = 28;
const dClassId = classIdMax - classIdMin;
const arr = [];
//following nested loop contains all possible subscriptions
for (let uId = userIdMin; uId <= userIdMax; uId++) {
  for (let cId = classIdMin; cId <= classIdMax; cId++) {
    arr.push({userId: uId, classId: cId});
  }
}
const newArr = [];
const subscriptionsPerUser = 8;
//following loop randomizes the order of the subscriptions
for (let combo = 0; combo < (dUserId+1) * Math.min(subscriptionsPerUser, dClassId + 1); combo++) {
  newArr.push(arr.splice(Math.floor(arr.length*Math.random()),1)[0]);
};
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Subscriptions', newArr, {}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Subscriptions', null, {})
};
