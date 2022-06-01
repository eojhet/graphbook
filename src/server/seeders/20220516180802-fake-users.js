'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'Users',
      [{
        avatar: '/uploads/avatar1.png',
        username: 'TestUser',
        createdAt: new Date(),
        updatedAt: new Date(),
        password: 'fartsinyourmouth97!',
        email: 'text1@example.com',
      },
      {
        avatar: '/uploads/avatar2.png',
        username: 'TestUser2',
        createdAt: new Date(),
        updatedAt: new Date(),
        password: 'fartsinyourmouth97!',
        email: 'text2@example.com',
      }],
    {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
