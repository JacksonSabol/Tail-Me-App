'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Walkers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      certification: {
        type: Sequelize.STRING
      },
      services: {
        type: Sequelize.STRING
      },
      logo: {
        type: Sequelize.BLOB
      },
      status: {
        type: Sequelize.ENUM
      },
      schedule: {
        type: Sequelize.DATE
      },
      available: {
        type: Sequelize.ENUM('available', 'unavailable')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Walkers');
  }
};