'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id_tg: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      investment_balance: {
        type: Sequelize.DECIMAL(30, 18),
        defaultValue: 1.0,
      },
      farm_balance: {
        type: Sequelize.DECIMAL(30, 18),
        defaultValue: 0.0,
      },
      level: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      clicks_today: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      clicks_total: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      bonus_locked: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  },
};
