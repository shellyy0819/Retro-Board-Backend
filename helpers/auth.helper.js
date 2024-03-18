const jwt = require('jsonwebtoken');

const fetchToken = async payload => {
  const token = await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: 500000
  });

  return token;
};

module.exports = { fetchToken };
