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

const verifyToken = async (req, res) => {
  const { authorization } = req?.headers || {};
  const token = getToken(authorization);
  if (token) {
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    return decodedToken;
  }
  return res.status(401).json({ status: 400, success: false, message: 'You are not authenticated!' });
};

module.exports = { fetchToken, verifyToken };
