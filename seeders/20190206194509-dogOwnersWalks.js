'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('dogOwners', [
      { dogName: 'sparky', emergencyContact: '(502)-54823187', rate: 20.00, createdAt: new Date(), updatedAt: new Date(), UserId: 2, walkerId: 1 }
    ], {})
      .then(function () {
        return queryInterface.bulkInsert('walks', [
          { checkinTime: new Date, finishTime: new Date, walkDate: new Date, issues: 'Very Nervous', finish: true, Billed: false, status: 'pending', createdAt: new Date(), updatedAt: new Date(), walkerId: 1, dogOwnerId: 1 }
        ], {});

      })

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
