const jwt = require('jsonwebtoken');
const { v4 } = require('uuid');

const fetchToken = async payload => {
  const token = jwt.sign(payload, v4(), {
    expiresIn: 50000
  });

  return token;
};

module.exports = { fetchToken };
