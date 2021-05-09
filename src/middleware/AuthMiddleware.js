const middleware = {};
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path: __dirname + `/../.env` });

middleware.verifyToken = (req, res, next) => {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Check the token
    jwt.verify(bearerToken, process.env.API_KEY, (err, authData) => {
      if(err) {
        res.sendStatus(403);
      } else {
        // Next middleware
        next();
      }
    });
  } else {
    // Forbidden
    res.sendStatus(403);
  }
};

module.exports = middleware;