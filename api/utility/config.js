require('dotenv').config();

module.exports = {
  env: (val) => {
    try {
      return process.env[val];
    } catch (error) {
      return '';
    }
  },
};
