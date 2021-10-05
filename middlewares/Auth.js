const { verify } = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  const accessToken = req.header('accessToken');

  if (!accessToken) return res.json({ error: 'User not logged in!' });

  try {
    const validToken = verify(accessToken, '3VDFC4bgaG');
    req.user = validToken;
    if (validToken) {
      res.locals.userLoggedIn = req.user;
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = { validateToken };
