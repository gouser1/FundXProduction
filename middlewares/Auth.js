const { verify } = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  const accessToken = req.header('accessToken');

  if (!accessToken) return res.sendStatus(401);

  const validToken = verify(accessToken, '3VDFC4bgaG');
  req.user = validToken;
  if (validToken) {
    res.locals.userLoggedIn = req.user;
    return next();
  }
};

module.exports = { validateToken };
