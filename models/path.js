'use strict';
module.exports = (sequelize, DataTypes) => {
  const path = sequelize.define('path', {
    pointType: DataTypes.STRING,   //"in" indicate firt point at checkin, "out" indicate last point at checkout, "dot" indicate regular point
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
    dateTime: DataTypes.DATE
  }, {});
  path.associate = function(models) {
    // associations can be defined here
    path.belongsTo(models.walks, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return path;
};