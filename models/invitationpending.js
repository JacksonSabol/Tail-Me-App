'use strict';
module.exports = (sequelize, DataTypes) => {
  const invitationPending = sequelize.define('invitationPending', {
    phoneNumber: DataTypes.STRING,
    name: DataTypes.STRING,
    specialCode: DataTypes.STRING
  }, {});
  invitationPending.associate = function(models) {
    // associations can be defined here
    invitationPending.belongsTo(models.walker, {
      foreignKey: {
        allowNull: false
      }
    });

  };
  return invitationPending;
};