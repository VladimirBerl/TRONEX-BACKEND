'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const levels = [
      { level: 0, price: 0, percent: 2 },
      { level: 1, price: 10, percent: 4 },
      { level: 2, price: 20, percent: 8 },
      { level: 3, price: 50, percent: 16 },
      { level: 4, price: 100, percent: 32 },
      { level: 5, price: 250, percent: 64 },
      { level: 6, price: 500, percent: 128 },
      { level: 7, price: 1000, percent: 256 },
      { level: 8, price: 2000, percent: 512 },
      { level: 9, price: 4000, percent: 1024 },
      { level: 10, price: 8000, percent: 2048 },
      { level: 11, price: 16000, percent: 4096 },
      { level: 12, price: 32000, percent: 8192 },
    ];
    await queryInterface.bulkInsert(
      'Levels',
      levels.map((level) => ({
        ...level,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Levels', null, {});
  },
};
