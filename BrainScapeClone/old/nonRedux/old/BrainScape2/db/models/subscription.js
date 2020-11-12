'use strict';
module.exports = (sequelize, DataTypes) => {
  const Subscription = sequelize.define('Subscription', {
    userId: DataTypes.INTEGER,
    classId: DataTypes.INTEGER
  }, {});
  Subscription.associate = function(models) {
    Subscription.belongsTo(models.User , {foreignKey: "userId" });
    Subscription.belongsTo(models.Class, {foreignKey: "classId"});
  };
  return Subscription;
};
