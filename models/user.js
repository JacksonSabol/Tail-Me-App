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
    address: DataTypes.STRING,
    City: DataTypes.STRING,
    State: DataTypes.STRING,
    zipCode: DataTypes.INTEGER,
    country: DataTypes.STRING
  }, {});
  user.associate = function(models) {
    // associations can be defined here

    user.belongsTo(models.auth, {
      foreignKey: {
       allowNull: false
     }
   });

    

    user.hasOne(models.walker, {
      onDelete: "cascade"
    });

    user.hasOne(models.dogOwner, {
      onDelete: "cascade"
    });

    
  };
  return user;
};