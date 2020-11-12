'use strict';
module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define('Class', {
    isPublic: DataTypes.BOOLEAN,
    name: DataTypes.STRING,
    quality: DataTypes.NUMERIC,
    description: DataTypes.TEXT,
    image: DataTypes.STRING
  }, {});
  Class.associate = function(models) {
    const columnMapping = {
      foreignKey: "classId",
      through: "Subscription",
      otherKey: "userId"
    };
    Class.belongsToMany(models.User, columnMapping);
    Class.hasMany(models.Deck        , {foreignKey: "classId"});
    Class.hasMany(models.Subscription, {foreignKey: "classId"});
  };
  return Class;
};
