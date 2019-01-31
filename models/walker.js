'use strict';
module.exports = (sequelize, DataTypes) => {
  const walker = sequelize.define('walker', {
    certification: DataTypes.STRING,
    services: DataTypes.STRING,
    logo: DataTypes.BLOB,
    status: {
      type: DataTypes.ENUM('available', 'unavailable')
  },
    schedule: DataTypes.DATE,
    available: DataTypes.BOOLEAN
  }, {});
  walker.associate = function(models) {
    // associations can be defined here
    walker.belongsTo(models.user, {
      foreignKey: {
        allowNull: false
      }
    });

    walker.hasMany(models.walks, {
      onDelete: "cascade"
    });

    walker.hasMany(models.dogOwner, {
      onDelete: "cascade"
    });

    walker.hasMany(models.invitationPending, {
      onDelete: "cascade"
    });
  };
  return walker;
};