'use strict';
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {allowNull: false, unique: true, type: DataTypes.STRING, validates: {isEmail: true, len: [3, 255]}},
      firstName: {type: DataTypes.STRING},
      lastName: {allowNull: false, type: DataTypes.STRING, validates: {len: [1, 30]}},
      hashedPassword: {allowNull: false, type: DataTypes.STRING.BINARY, validates: {len: [60, 60]}},
    },
    {
      defaultScope: {attributes: {exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]}},
        scopes: {currentUser: {attributes: { exclude: ["hashedPassword"] }}, loginUser: {attributes: {}}
      }
    }
  );

  User.associate = function(models) {
  };

  User.prototype.toSafeObject = function() {
    // Cannot I replace this with return {...this}?
    const {id, firstName, lastName, email} = this;
    return { id, firstName, lastName, email };
  };

  User.login = async function({ username, password }) {
    const user = await User.scope('loginUser').findOne({where: { email }});
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

  User.prototype.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  User.getCurrentUserById = async function(id) {
    return await User.scope("currentUser").findByPk(id);
  };

  User.signup = async function({ username, email, password }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({firstName, lastName, email, hashedPassword});
    return await User.scope("currentUser").findByPk(user.id);
  };

  return User;
};
