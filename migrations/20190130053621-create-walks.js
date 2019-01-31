'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Walks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      checkinTime: {
        type: Sequelize.DATE
      },
      finishTime: {
        type: Sequelize.DATE
      },
      walkDate: {
        type: Sequelize.DATE
      },
      issues: {
        type: Sequelize.STRING
      },
      stars: {
        type: Sequelize.INTEGER
      },
      finish: {
        type: Sequelize.BOOLEAN
      },
      Billed: {
        type: Sequelize.BOOLEAN
      },
      rate: {
        type: Sequelize.DECIMAL(4,2)
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
    return queryInterface.dropTable('Walks');
  }
};