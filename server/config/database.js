require('dotenv').config();

module.exports = {
  development: {
    url: process.env.NITRO_DATABASE_URL,
    dialect: 'postgres',
    debug: true,
    dialectOptions: {
      charset: 'utf8',
    },
  },
};
