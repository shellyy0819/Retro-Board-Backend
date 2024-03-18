const jwt = require('jsonwebtoken');

const fetchToken = async payload => {
  const token = await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: 500000
  });

  return token;
};

const getToken = authorization => {
  if (authorization && authorization.split(' ')[0] === 'Bearer') {
    return authorization.split(' ')[1];
  }
  return null;
};

const verifyToken = async req => {
  const { authorization } = req?.headers || {};
  const token = getToken(authorization);

  try {
    if (token) {
      const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
      return decodedToken;
    }

    return null;
  } catch (error) {
    console.error('Error verifying token:', error);
    throw new Error('Error verifying token:', error);
  }
};

module.exports = { fetchToken, verifyToken };
