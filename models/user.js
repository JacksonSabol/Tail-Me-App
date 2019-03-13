'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    userType: {
      type: DataTypes.ENUM('walker', 'owner')
    },
    aboutMe: DataTypes.STRING,
    profilePhoto: DataTypes.BLOB,
    profilePhotoURL: DataTypes.STRING,
    address: DataTypes.STRING,
    City: DataTypes.STRING,
    State: DataTypes.STRING,
    zipCode: DataTypes.INTEGER,
    country: DataTypes.STRING
  }, {});
  user.associate = function (models) {
    // associations can be defined here

    user.belongsTo(models.auth, {
      foreignKey: {
        allowNull: false
      }
    });

    user.hasOne(models.walker, {
      onDelete: "cascade"
    });

    user.hasMany(models.dogOwner, {
      onDelete: "cascade"
    });
    user.hasMany(models.walks, {
      onDelete: "cascade"
    });
    user.hasMany(models.walkImages, {
      onDelete: "cascade"
    });

  };
  return user;
};