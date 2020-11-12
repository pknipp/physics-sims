'use strict';
module.exports = (sequelize, DataTypes) => {
  const History = sequelize.define('History', {
    userId: DataTypes.INTEGER,
    cardId: DataTypes.INTEGER,
    confidence1: DataTypes.INTEGER,
    confidence2: DataTypes.INTEGER
  }, {});
  History.associate = function(models) {
    History.belongsTo(models.User , {foreignKey: "userId" });
    History.belongsTo(models.Card, {foreignKey: "cardId"});
  };
  return History;
};
