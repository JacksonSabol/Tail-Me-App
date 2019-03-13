'use strict';
module.exports = (sequelize, DataTypes) => {
  const walks = sequelize.define('walks', {
    checkinTime: DataTypes.DATE,
    checkinGPSLatitude: DataTypes.DECIMAL(11, 8),
    checkinGPSLongitude: DataTypes.DECIMAL(11, 8),
    finishTime: DataTypes.DATE,
    checkoutGPSLatitude: DataTypes.DECIMAL(11, 8),
    checkoutGPSLongitude: DataTypes.DECIMAL(11, 8),
    walkDate: DataTypes.DATE,
    issues: DataTypes.STRING,
    stars: DataTypes.INTEGER,
    finish: DataTypes.BOOLEAN,
    Billed: DataTypes.BOOLEAN,
    note: DataTypes.TEXT,
    emailSent: DataTypes.BOOLEAN,
    status: {
      type: DataTypes.ENUM('pending', 'done', 'cancel')
    },
    rate: DataTypes.DECIMAL(4, 2)
  }, {});
  walks.associate = function (models) {
    // associations can be defined here

    walks.belongsTo(models.walker, {
      foreignKey: {
        allowNull: false
      }
    });

    // Associate the dogs
    walks.belongsTo(models.dogOwner, {
      foreignKey: {
        allowNull: false
      }
    });

    // Associate the dog owner with each walk to make querying easier
    walks.belongsTo(models.user, {
      foreignKey: {
        allowNull: false
      }
    })

    walks.hasMany(models.path, {
      onDelete: "cascade"
    });

    
  };
  return walks;
};