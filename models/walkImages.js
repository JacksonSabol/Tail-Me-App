'use strict';
module.exports = (sequelize, DataTypes) => {
  const walkImages = sequelize.define('walkImages', {
    
  }, {});
  walkImages.associate = function(models) {
    // associations can be defined here
    walkImages.belongsTo(models.user, {
      foreignKey: {
        allowNull: false
      }
    });
    walkImages.belongsTo(models.images, {
        foreignKey: {
          allowNull: false
        }
      });
    
  };
  return walkImages;
};