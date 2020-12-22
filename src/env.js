const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

module.exports = {
  API_ENDPOINT: process.env.API_ENDPOINT || 'http://localhost:8080',
  PORT: process.env.PORT || 8081,
};
