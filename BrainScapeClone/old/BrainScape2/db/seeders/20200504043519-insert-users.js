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
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      r({firstName:'Demo',lastName:"User",email:'demo@aol.com',wantsEmail:true,optStuff:"blah",hashedPassword:await bcrypt.hash('password',10)}),
      r({firstName:'John',lastName:"Doe",email: 'jdoe@aol.com',wantsEmail:false,optStuff:null, hashedPassword:await bcrypt.hash('password', 10)}),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users');
  }
};
