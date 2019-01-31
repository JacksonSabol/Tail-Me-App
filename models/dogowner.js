'use strict';
module.exports = (sequelize, DataTypes) => {
  const dogOwner = sequelize.define('dogOwner', {
    dogName: DataTypes.STRING,
    emergencyContact: DataTypes.STRING,
    picDog: DataTypes.BLOB,
    rate: DataTypes.DECIMAL(4,2)
  }, {});
  dogOwner.associate = function(models) {
    // associations can be defined here

    dogOwner.belongsTo(models.user, {
      foreignKey: {
        allowNull: false
      }
    });

    dogOwner.hasMany(models.walks, {
      onDelete: "cascade"
    });

    dogOwner.belongsTo(models.walker, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return dogOwner;
};