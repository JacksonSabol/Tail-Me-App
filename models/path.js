'use strict';
module.exports = (sequelize, DataTypes) => {
  const path = sequelize.define('path', {
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