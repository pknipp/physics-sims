'use strict';

const bcrypt = require('bcryptjs');

function createPassword() {
  return bcrypt.hashSync('password');
}

function r(o) {
  o.createdAt = new Date();
  o.updatedAt = new Date();
  return o;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      r({ firstName: 'Demo', lastName: "User", email: 'demo@aol.com', hashedPassword: createPassword() }),
      r({ firstName: 'John', lastName: "Doe" , email: 'john@aol.com', hashedPassword: createPassword() }),
      r({ firstName:  null , lastName: "Thor", email: 'thor@aol.com', hashedPassword: createPassword() }),
    ]);
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users')
};
