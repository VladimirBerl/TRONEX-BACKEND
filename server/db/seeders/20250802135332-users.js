'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = Array.from({ length: 20 }, (_, i) => ({
      id_tg: String(i + 15),
      username: `test ${i + 15}`,
    }));

    await queryInterface.bulkInsert(
      'Users',
      users.map((user) => ({
        ...user,
        farm_balance_reset_at: new Date(),
        clicks_today_reset_at: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
