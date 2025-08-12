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
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'active',
      },
      wallet_address: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      deposit: {
        type: Sequelize.DECIMAL(30, 18),
        defaultValue: 0,
        allowNull: false,
      },
      investment_balance: {
        type: Sequelize.DECIMAL(30, 18),
        allowNull: false,
        defaultValue: 0.3,
      },
      farm_balance: {
        type: Sequelize.DECIMAL(30, 18),
        allowNull: false,
        defaultValue: 0.0,
      },
      farm_balance_reset_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      level: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      clicks_today: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      clicks_today_reset_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      bonus_locked: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
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
