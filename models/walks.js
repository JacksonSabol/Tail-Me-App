'use strict';
module.exports = (sequelize, DataTypes) => {
  const walks = sequelize.define('walks', {
    checkinTime: DataTypes.DATE,
    finishTime: DataTypes.DATE,
    walkDate: DataTypes.DATE,
    issues: DataTypes.STRING,
    stars: DataTypes.INTEGER,
    finish: DataTypes.BOOLEAN,
    Billed: DataTypes.BOOLEAN,
    status: {
      type: DataTypes.ENUM('pending', 'done', 'cancel')
  },
    rate: DataTypes.DECIMAL(4,2)
  }, {});
  walks.associate = function(models) {
    // associations can be defined here

    walks.belongsTo(models.walker, {
    foreignKey: {
        allowNull: false
      }
    });

    walks.belongsTo(models.dogOwner, {
      foreignKey: {
          allowNull: false
        }
      });
    
    
    walks.hasMany(models.path, {
      onDelete: "cascade"
    });

    walks.hasMany(models.images, {
      onDelete: "cascade"
    });
  };
  return walks;
};