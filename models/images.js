'use strict';
module.exports = (sequelize, DataTypes) => {
  const images = sequelize.define('images', {
    image: DataTypes.BLOB,
    sendCustomer: DataTypes.BOOLEAN,
    url: DataTypes.STRING,
  }, {});
  images.associate = function(models) {
    // associations can be defined here
    images.belongsTo(models.walks, {
      foreignKey: {
        allowNull: false
      }
    });
    
    images.belongsTo(models.dogOwner, {
      foreignKey: {
        allowNull: true
      }
    });
  };
  return images;
};