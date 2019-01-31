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
    return queryInterface.bulkInsert('auths', [
      { email: 'vivian.aguilar@gmail.com', password: '123', last_login: new Date(), status: 'active', createdAt: new Date(), updatedAt: new Date() }

    ], {}).then(function () {
      return queryInterface.bulkInsert('users', [
        { firstName: 'John', lastName: 'Doe', userType: 'walker',aboutMe:'Info about me', address:'140 Surrey St.',City:'San Francisco',State:'California',zipCode:'94131',country:'United States', authId: 1, createdAt: new Date(), updatedAt: new Date() }

      ], {});
    }).then(function () {
      return queryInterface.bulkInsert('auths', [
        { email: 'agarcia010617@gmail.com', password: '123', last_login: new Date(), status: 'active', createdAt: new Date(), updatedAt: new Date() }
      ], {});
    }).then(function () {
      return queryInterface.bulkInsert('users', [
        { firstName: 'Jason', lastName: 'Max', userType: 'owner',aboutMe:'Info about Max', address:'100 Surrey St.',City:'San Francisco',State:'California',zipCode:'94131',country:'United States', authId: 2, createdAt: new Date(), updatedAt: new Date() }
      ], {});
      
    }).then(function () {
      return queryInterface.bulkInsert('walkers', [
        { certification: 'This is Certification', services:'This is my services',status:'available', createdAt: new Date(), updatedAt: new Date(),  UserId: 1 }
      ], {});
    }).then(function () {
      return queryInterface.bulkInsert('dogOwners', [
        { dogName: 'sparky', emergencyContact:'(502)-54823187',rate:20.00, createdAt: new Date(), updatedAt: new Date(),  UserId: 2,walkerId:1 }
      ], {});
    }).then(function () {
      return queryInterface.bulkInsert('walks', [
        { checkinTime: new Date, finishTime:new Date,walkDate:new Date, issues:'Very Nervous', finish: true, Billed:false,status:'pending',createdAt: new Date(), updatedAt: new Date(),walkerId:1,dogOwnerId:1 }
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
