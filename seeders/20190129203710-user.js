'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [{
        username: 'billy',
        email: 'examps2le@aol.com',
        password: 'fi2sh123',
        createdAt:Sequelize.literal('NOW()'),
        updatedAt: new Date()
      }], {});
  
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
