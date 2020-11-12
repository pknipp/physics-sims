'use strict';
module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define('Card', {
    deckId: DataTypes.INTEGER,
    question: DataTypes.STRING,
    answer: DataTypes.STRING
  }, {});
  Card.associate = function(models) {
    Card.belongsTo(models.Deck, {foreignKey: "deckId"});
    Card.hasMany(models.History, {foreignKey: "cardId"});
    const columnMapping = {foreignKey: 'cardId', through: 'History', otherKey: 'userId'};
    Card.belongsToMany(models.User, columnMapping);
  };
  return Card;
};
