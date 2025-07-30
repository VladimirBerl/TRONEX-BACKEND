'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'investment_balance', {
      type: Sequelize.DECIMAL(30, 18),
      defaultValue: 1.0,
    });
    await queryInterface.changeColumn('Users', 'farm_balance', {
      type: Sequelize.DECIMAL(30, 18),
      defaultValue: 0.0,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'investment_balance', {
      type: Sequelize.DECIMAL(10, 2),
      defaultValue: 1.0,
    });
    await queryInterface.changeColumn('Users', 'farm_balance', {
      type: Sequelize.DECIMAL(10, 2),
      defaultValue: 0.0,
    });
  },
};
