'use strict';
module.exports = (sequelize, DataTypes) => {
  const walkImages = sequelize.define('walkImages', {
    
  }, {});
  walkImages.associate = function(models) {
    // associations can be defined here
    walkImages.belongsTo(models.walks, {
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