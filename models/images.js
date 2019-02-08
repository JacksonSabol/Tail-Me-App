'use strict';
module.exports = (sequelize, DataTypes) => {
  const images = sequelize.define('images', {
    image: DataTypes.BLOB,
    sendCustomer: DataTypes.BOOLEAN,
    url: DataTypes.STRING,
    GPSLatitudeRef: DataTypes.STRING,
    GPSLatitude: DataTypes.DECIMAL(11, 8),
    GPSLongitudeRef: DataTypes.STRING,
    GPSLongitude: DataTypes.DECIMAL(11, 8),
    DateTimeOriginal: DataTypes.DATE
  }, {});
  images.associate = function (models) {
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

    images.belongsTo(models.walker, {
      foreignKey: {
        allowNull: true
      }
    });
  };
  return images;
};