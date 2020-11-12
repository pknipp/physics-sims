'use strict';
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
        // validates: {
        //   isEmail: true,
        //   len: [3, 255],
        // },
      },
      firstName: {
        allowNull: false,
        type: DataTypes.STRING,
        // validates: {
        //   len: [1, 255],
        // },
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING,
        // validates: {
        //   len: [1, 255],
        // },
      },
      optStuff: {
        type: DataTypes.TEXT
      },
      wantsEmail: {
        type: DataTypes.BOOLEAN
      },
      hashedPassword: {
        allowNull: false,
        type: DataTypes.STRING.BINARY,
        validates: {
          len: [60, 60],
        },
      },
    },
    {
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"],
        },
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword"] },
        },
        loginUser: {
          attributes: {},
        },
      },
    }
  );

  User.associate = function(models) {
    User.hasMany(models.Subscription, {foreignKey: "userId"});
    let columnMapping = {foreignKey: "userId", through: "Subscription", otherKey: "classId"};
    User.belongsToMany(models.Class, columnMapping);
    columnMapping = {foreignKey: "userId", through: "History", otherKey: "cardId"};
    User.belongsToMany(models.Card, columnMapping);
  };

  User.prototype.toSafeObject = function() {
    const {
      id,
      username
    } = this;

    return { id, username };
  };

  User.login = async function({ email, password }) {
    const user = await User.scope('loginUser').findOne({where: [{ email }]});
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

  User.signup = async function({ firstName, lastName, optStuff, email, wantsEmail, password }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      firstName,
      lastName,
      email,
      optStuff,
      email,
      wantsEmail,
      hashedPassword
    });
    return await User.scope("currentUser").findByPk(user.id);
  };

  return User;
};
