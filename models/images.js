'use strict';
module.exports = (sequelize, DataTypes) => {
  const images = sequelize.define('images', {
    image: DataTypes.BLOB,
    sendCustomer: DataTypes.BOOLEAN
  }, {});
  images.associate = function(models) {
    // associations can be defined here
    images.belongsTo(models.walks, {
      foreignKey: {
        allowNull: false
      }
    });
    
  };
  return images;
};