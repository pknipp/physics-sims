'use strict';
module.exports = (sequelize, DataTypes) => {
  const Deck = sequelize.define('Deck', {
    classId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    objective: DataTypes.TEXT
  }, {});
  Deck.associate = function(models) {
    Deck.belongsTo(models.Class, {foreignKey: "classId"});
    Deck.hasMany(models.Card, {foreignKey: "deckId"});
  };
  return Deck;
};
